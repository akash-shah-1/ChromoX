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

    // Check if there are no changes to update
    if (Object.keys(UpdatedBody).length === 0) {
      return res
        .status(400)
        .json({ message: "No changes provided for update" });
    }

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
      UdpatedUser: DeletedUser,
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