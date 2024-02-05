const User =  require('../models/User');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')



//Sign Up || Creating User
module.exports.createUser = async(req,res)=>{
    try {
        const {username,email,password} = req.body;

        //Check Incomplete Field
        if(!username || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
     
        //---Find username
        const findUserName = await User.findOne({username})
        if(findUserName){
            return res.status(400).json({
                message :  "Username already exist"
            })
        }
    
        //---Find Mail
        const findMail = await User.findOne({email})
        if(findMail){
            return res.status(400).json({
                message:"email is alreay exist"
            })
        }
    
        //HashPassword using bcrypt
        const HashPassword = await bcrypt.hashSync(password,saltRounds);
    
        //Create User 
        const user = await User.create({
            username,
            email,
            password : HashPassword
        })
    
        // Data that no need to show like password
        const userDetails =  {password, ...user}
        
        // send success status
        return res.status(201).json({
            message:"User created Sucessfully",
            User : userDetails._doc
        })
    
    } catch (error) {
        return res.status(400).json({
            message :"Error in Creating User"
        })
    }
}


//Sign in User 
module.exports.SignIn = async(req,res)=>{
    try {
        const {email, password} = req.body;
        
        // Check email exist
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message :"Email is not exist"
            })
        }

        //check password match 
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({
                message:"Email or password is incorrect"
            })
        }

        //generate token using jsonwebtoken  , storing user's Id in payload || If user is Adimin so user have all access
        const token =  jwt.sign({sub:user._id,isAdmin:user.isAdmin},process.env.secretKey,{expiresIn:'1h'})

        //Return success 
        return res.status(200).json({
            message : "User Signed in Successfully",
            token : "Bearer "+token
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message :"Error in Creating User"
        })
    }
}

//Get All User
module.exports.getAllUser = async(req,res)=>{
    try {
        const AllUser = await User.find();
        if(!AllUser){
            return res.status(400).json({
                message:"there is no users in Database"
            })
        }
        return res.status(200).json(AllUser)
    } catch (error) {
        return res.status(400).json({
            message : "Error in getting user"
        })
    }
}