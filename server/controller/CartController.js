const Cart = require("../models/Cart");

//Creating Cart
module.exports.createCart = async (req, res) => {
  try {
    const  newCart = new Cart(req.body);
    //Create Cart
    const savedCart = await Cart.create(newCart);
    // send success status
    return res.status(201).json({
      message: "Cart created Sucessfully",
      Cart: savedCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Creating Cart",
    });
  }
};


//Udapte Cart
module.exports.UpdateCart = async (req, res) => {
  try {
    const CartId = req.params.id;
    //udpated data entered by Cart
    const UpdatedBody = req.body;

    const UdpateCart = await Cart.findByIdAndUpdate(CartId, UpdatedBody, {
      new: true,
    });

    //return success
    return res.status(200).json({
      message: "Cart Updated Successfully",
      UdpatedCart: UdpateCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Udpating Cart",
    });
  }
};


//Delete Cart
module.exports.DeleteCart = async (req, res) => {
  try {
    const CartId = req.params.id;

    const DeletedCart = await Cart.findByIdAndDelete(CartId);

    //return success
    return res.status(200).json({
      message: "Cart Deleted Successfully",
      Deleted_Cart: DeletedCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Deleting Cart",
    });
  }
};


//Get User Cart
module.exports.getCart = async (req, res) => {
  try {
    const UserID = req.params.userId;
    const GetCart = await Cart.findById({userId : UserID});

    //If No Cart found
    if (!GetCart) {
      return res.status(404).json({
        message: "No cart found for that userID",
      });
    }

    //if Cart found
    return res.status(200).json({
      message: "Cart found",
      CartInfo: GetCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in finding Cart",
    });
  }
};


//Get All Cart
module.exports.getAllCart = async (req, res) => {
  try {
    const limit = req.query.limit;
    Cart =  await Cart.find().limit(limit); 
    
    return res.status(200).json(Cart);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting Cart",
    });
  }
};

