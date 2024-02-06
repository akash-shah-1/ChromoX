const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//Sign Up || Creating User
module.exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Check Incomplete Field
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //---Find username
    const findUserName = await User.findOne({ username });
    if (findUserName) {
      return res.status(400).json({
        message: "Username already exist",
      });
    }

    //---Find Mail
    const findMail = await User.findOne({ email });
    if (findMail) {
      return res.status(400).json({
        message: "email is alreay exist",
      });
    }

    //HashPassword using bcrypt
    const HashPassword = await bcrypt.hashSync(password, saltRounds);

    //Create User
    const user = await User.create({
      username,
      email,
      password: HashPassword,
    });

    // Data that no need to show like password
    const userDetails = { password, ...user };

    // send success status
    return res.status(201).json({
      message: "User created Sucessfully",
      User: userDetails._doc,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Creating User",
    });
  }
};

//Sign in User
module.exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email is not exist",
      });
    }

    //check password match
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Email or password is incorrect",
      });
    }

    //generate token using jsonwebtoken  , storing user's Id in payload || If user is Adimin so user have all access
    const token = jwt.sign(
      { sub: user._id, isAdmin: user.isAdmin },
      process.env.secretKey,
      { expiresIn: "1h" }
    );

    //Return success
    return res.status(200).json({
      message: "User Signed in Successfully",
      token: "Bearer " + token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in Creating User",
    });
  }
};

//Udapte User
module.exports.UpdateUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    //udpated data entered by user
    const UpdatedBody = req.body;
    
    const UdpateUser = await User.findByIdAndUpdate(UserId, UpdatedBody, {
      new: true,
    });

    //return success
    return res.status(200).json({
      message: "User Updated Successfully",
      UdpatedUser: UdpateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Udpating user",
    });
  }
};

//Delete User
module.exports.DeleteUser = async (req, res) => {
  try {
    const UserId = req.params.id;

    const DeletedUser = await User.findByIdAndDelete(UserId);

    //return success
    return res.status(200).json({
      message: "User Deleted Successfully",
      Deleted_User: DeletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Deleting user",
    });
  }
};

//Get User
module.exports.getUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const GetUser = await User.findById(userID);

    //If No user found
    if (!GetUser) {
      return res.status(404).json({
        message: "No User found",
      });
    }

    //if user found
    return res.status(200).json({
      message: "User found",
      UserInfo: GetUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in finding User",
    });
  }
};

//Get All User
module.exports.getAllUser = async (req, res) => {
  try {
    //If we want latest user so we can add query in params ?new=true&limit=5
    const query = req.query.new;
    const limit = req.query.limit;

    // console.log("Query = ", query)
    // console.log("Limit = ", limit)

    //if there is a query so it will return first 5 latest user
    const AllUser = query
      ? await User.find().sort({ _id: -1 }).limit(limit)
      : await User.find(); // the value -1 in the sort method is used to sort documents in descending order based on the specified field.
    if (!AllUser) {
      return res.status(400).json({
        message: "there is no users in Database",
      });
    }
    return res.status(200).json(AllUser);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting user",
    });
  }
};

//Get User Stats 
//It will return us total number of user per months in response
// means if today is 6 feb , so it will show me data from 6feb 2023 to the current date 6th feb 2024 per/month
//To get user per month data we will use monogodb agreegate

module.exports.getstats = async(req,res)=>{
  try {
    //Getting current data/today's data -> ex : Tue Feb 06 2024 12:40:03 GMT+0530 (India Standard Time)
    const date = new Date();
    //getting last year date from now ->  means if today is 6 feb 2024, so it will show me 6feb 2023 -> ex : Mon Feb 06 2023 12:42:12 GMT+0530 (India Standard Time)
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

    //MongoDB Aggegation
    const data = await User.aggregate([
      {$match:{createdAt :{$gte : lastYear}}}, //It will return me user who is created lastyear from the current date
      {$project:{
        month: {$month : "$createdAt"} // return me month from created at -> sp supppose user createdAt : 2024-02-02T12:56:00.432+00:00 , so it will give me 02, that is month 2 (feb) 
      }} ,
      {
        $group:{
          _id:"$month", // taking month as Id 
          total:{$sum :1} // this will return me total user per month (month is accodign to ID , because we set id as out month)
        }
      }
    ])

    return res.status(200).json({
      message :"User Stats",
      data
    })

  } catch (error) {
    return res.status(500).json({
      message:"Error in getting stats"
    })    
  }
}