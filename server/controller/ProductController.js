const Product = require("../models/Product");

//Creating Product
module.exports.createProduct = async (req, res) => {
  try {
    const  newProduct = new Product(req.body);
    //Create Product
    const savedProduct = await Product.create(newProduct);
    // send success status
    return res.status(201).json({
      message: "Product created Sucessfully",
      Product: savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Creating Product",
    });
  }
};


//Udapte Product
module.exports.UpdateProduct = async (req, res) => {
  try {
    const ProductId = req.params.id;
    //udpated data entered by product
    const UpdatedBody = req.body;

    const UdpateProduct = await Product.findByIdAndUpdate(ProductId, UpdatedBody, {
      new: true,
    });

    //return success
    return res.status(200).json({
      message: "Product Updated Successfully",
      UdpatedProduct: UdpateProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Udpating Product",
    });
  }
};


//Delete Product
module.exports.DeleteProduct = async (req, res) => {
  try {
    const ProductId = req.params.id;

    const DeletedProduct = await Product.findByIdAndDelete(ProductId);

    //return success
    return res.status(200).json({
      message: "Product Deleted Successfully",
      Deleted_Product: DeletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Deleting Product",
    });
  }
};


//Get Product
module.exports.getProduct = async (req, res) => {
  try {
    const ProductID = req.params.id;
    const GetProduct = await Product.findById(ProductID);

    //If No Product found
    if (!GetProduct) {
      return res.status(404).json({
        message: "No Product found",
      });
    }

    //if Product found
    return res.status(200).json({
      message: "Product found",
      ProductInfo: GetProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in finding Product",
    });
  }
};


//Get All Product
module.exports.getAllProduct = async (req, res) => {
  try {
    //If we want latest Product so we can add query in params ?new=true&limit=5
    const query = req.query.new;
    const limit = req.query.limit || 2;
    const categery = req.query.categery;

    let product;

    //if there is a query so it will return latest Product
    if(query){
        product = await Product.find().sort({ createdAt: -1 }).limit(limit) // the value -1 in the sort method is used to sort documents in descending order based on the specified field.
    }
    else if(categery){
        product = await Product.find({
            categories:{
                $in : [categery]
            }
        }).limit(limit)
    }
    else{
    product =  await Product.find().limit(limit); 
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting Product",
    });
  }
};

