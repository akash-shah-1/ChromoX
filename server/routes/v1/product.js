const router = require('express').Router();
const ProductController = require('../../controller/ProductController')
const passport =  require('../../config/passportJWT')
const isAdmin = require('../../config/isAdmin')

// Creating Product
router.post('/create', passport.authenticate('jwt',{session:false}), isAdmin, ProductController.createProduct);
//Update Product
router.put('/:id', passport.authenticate('jwt',{session:false}),isAdmin,ProductController.UpdateProduct)
//Delete Product
router.delete('/:id', passport.authenticate('jwt',{session:false}),isAdmin,ProductController.DeleteProduct)


//GetProduct
router.get('/find/:id',ProductController.getProduct);
//Get All Product
router.get('/',ProductController.getAllProduct);

module.exports = router;