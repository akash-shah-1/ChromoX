const router = require('express').Router();
const userController = require('../../controller/UserController')
const passport =  require('../../config/passportJWT')
const isAdmin = require('../../config/isAdmin')
const checkOwnProfile = require('../../config/checkOwnProfile')

// Creating User
router.post('/signup', userController.createUser);
// Login User
router.post('/signin',userController.SignIn);
//Update User
router.put('/:id', passport.authenticate('jwt',{session:false}),checkOwnProfile,userController.UpdateUser)
//Delete User
router.delete('/:id', passport.authenticate('jwt',{session:false}),checkOwnProfile,userController.DeleteUser)


//GetUser
router.get('/find/:id',passport.authenticate('jwt',{session:false}), isAdmin,userController.getUser);
//Get All User
router.get('/alluser',passport.authenticate('jwt',{session:false}), isAdmin,userController.getAllUser);
//Get Stats
router.get('/stats',passport.authenticate('jwt',{session:false}), isAdmin,userController.getstats);

module.exports = router;