const router = require('express').Router();

// User 
router.use('/user',require('./user'));
// Product
router.use('/product',require('./product'));
//cart
router.use('/cart',require('./cart'));
//order
router.use('/order',require('./order'));


module.exports= router;