const router = require('express').Router();
const userController = require('../../controller/UserController')
const passport =  require('../../config/passportJWT')
const isAdmin = require('../../config/isAdmin')


// Creating User
router.post('/signup', userController.createUser);
// Login User
router.post('/signin',userController.SignIn);

//Get All User
router.get('/alluser',passport.authenticate('jwt',{session:false}), isAdmin,userController.getAllUser);

module.exports = router;