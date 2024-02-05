// middleware/checkOwnProfile.js

const checkOwnProfile = (req, res, next) => {
    const userId = req.params.id;

    // console.log("ID form passport jwt => ", req.user._id) // converting toString() because we are getting id like this : new ObjectId('65bcedbe528467e19xxxxxx')
  
    // Check if the user making the request is updating their own profile
    if (userId !== req.user._id.toString()) { 
      return res.status(403).json({ message: 'Forbidden - Cannot update other user profiles' });
    }
  
    // If the user is updating their own profile, continue to the next middleware or route handler
    next();
  };
  
  module.exports = checkOwnProfile;
  