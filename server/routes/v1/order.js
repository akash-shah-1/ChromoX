const router = require('express').Router();
const OrderController = require('../../controller/OrderController')
const passport =  require('../../config/passportJWT')
const isAdmin = require('../../config/isAdmin')
const checkOwnProfile = require('../../config/checkOwnProfile')


// Creating Order
router.post('/create', passport.authenticate('jwt',{session:false}), OrderController.createOrder);
//Update Order
router.put('/:id', passport.authenticate('jwt',{session:false}),isAdmin,OrderController.UpdateOrder)
//Delete Order
router.delete('/:id', passport.authenticate('jwt',{session:false}),isAdmin,OrderController.DeleteOrder)


//GetOrder
router.get('/find/:userId',passport.authenticate('jwt',{session:false}),checkOwnProfile,OrderController.getOrder);
//Get All Order
router.get('/',passport.authenticate('jwt',{session:false}),isAdmin,OrderController.getAllOrder);
//Get Monthly Income 
router.get('/income',passport.authenticate('jwt',{session:false}),isAdmin,OrderController.getIncome);



module.exports = router;