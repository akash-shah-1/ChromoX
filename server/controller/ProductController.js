const Product = require("../models/Product");

//Creating Product
module.exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
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

    const UdpateProduct = await Product.findByIdAndUpdate(
      ProductId,
      UpdatedBody,
      {
        new: true,
      }
    );

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
    const limit = req.query.limit;
    const query = req.query;
    let filter = {};

    //Handle Categery filter
    //Handle Category filter
    if (query.category) {
      filter.categories = { $in: query.category };
    }

    console.log(filter);
    //Medium
    if (query.medium) {
      filter.medium = { $in: query.medium };
    }

    //Size
    if (query.size) {
      filter.size = { $in: query.size };
    }

    //Price
    if (query.price) {
      const [ minPrice, maxPrice ] = query.price.split("-").map(Number);
      console.log(minPrice," ", maxPrice);
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
    console.log(filter.price)

    //style
    if (query.style) {
      filter.style = { $in: query.style };
    }

    //subject
    if (query.subject) {
      filter.subject = { $in: query.subject };
    }

    //Handling Sort
    let sortOption = {};
    if (query.sort === "Newest") {
      sortOption = { createdAt: -1 };
    } else if (query.sort === "Price: Low to High") {
      sortOption = { price: 1 };
    } else if (query.sort === "Price: High to Low") {
      sortOption = { price: -1 };
    }

    let products = await Product.find(filter).sort(sortOption).limit(limit);

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in getting Product",
    });
  }
};

//Get suggestions products from product's subject
module.exports.getsuggestionsProducts = async (req, res) => {
  try {
    
    console.log("My subject ---> ", req.params.s);
      const subject = req.params.s;
      const products = await Product.find({ subject :subject});

      if (!products || products.length === 0) {
          return res.status(404).json({
              message: "No products found for the provided subject."
          });
      }

      return res.status(200).json(products);
  } catch (error) {
      console.error("Error in finding products:", error);
      return res.status(500).json({
          message: "Error in finding products. Please try again later."
      });
  }
}
