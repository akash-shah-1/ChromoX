const router = require('express').Router();
const CartController = require('../../controller/CartController')
const passport =  require('../../config/passportJWT')
const isAdmin = require('../../config/isAdmin')
const checkOwnProfile = require('../../config/checkOwnProfile')


// Creating Cart
router.post('/create', passport.authenticate('jwt',{session:false}), CartController.createCart);
//Update Cart
router.put('/:id', passport.authenticate('jwt',{session:false}),checkOwnProfile,CartController.UpdateCart)
//Delete Cart
router.delete('/:id', passport.authenticate('jwt',{session:false}),checkOwnProfile,CartController.DeleteCart)


//GetCart
router.get('/find/:userId',passport.authenticate('jwt',{session:false}),checkOwnProfile,CartController.getCart);
//Get All Cart
router.get('/',passport.authenticate('jwt',{session:false}),isAdmin,CartController.getAllCart);

module.exports = router;