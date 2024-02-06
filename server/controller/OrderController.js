const Order = require("../models/Order");

//Creating Order
module.exports.createOrder = async (req, res) => {
  try {
    const  newOrder = new Order(req.body);
    //Create Order
    const savedOrder = await Order.create(newOrder);
    // send success status
    return res.status(201).json({
      message: "Order created Sucessfully",
      Order: savedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Creating Order",
    });
  }
};


//Udapte Order
module.exports.UpdateOrder = async (req, res) => {
  try {
    const OrderId = req.params.id;
    //udpated data entered by Order
    const UpdatedBody = req.body;

    const UdpateOrder = await Order.findByIdAndUpdate(OrderId, UpdatedBody, {
      new: true,
    });

    //return success
    return res.status(200).json({
      message: "Order Updated Successfully",
      UdpatedOrder: UdpateOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Udpating Order",
    });
  }
};


//Delete Order
module.exports.DeleteOrder = async (req, res) => {
  try {
    const OrderId = req.params.id;

    const DeletedOrder = await Order.findByIdAndDelete(OrderId);

    //return success
    return res.status(200).json({
      message: "Order Deleted Successfully",
      Deleted_Order: DeletedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Deleting Order",
    });
  }
};


//Get User Order
module.exports.getOrder = async (req, res) => {
  try {
    const UserID = req.params.userId;
    const GetOrder = await Order.findById({userId : UserID});

    //If No Order found
    if (!GetOrder) {
      return res.status(404).json({
        message: "No Order found for that userID",
      });
    }

    //if Order found
    return res.status(200).json({
      message: "Order found",
      OrderInfo: GetOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in finding Order",
    });
  }
};


//Get All Order
module.exports.getAllOrder = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
   const GetOrder =  await Order.find().limit(limit); 
    
    return res.status(200).json(GetOrder);
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Error in getting Order",
      error:error.message
    });
  }
};

//Get Monthly Income
module.exports.getIncome = async(req,res)=>{
    const date = new Date(); // current date
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); // this will give lastMonth , ex : if curr month is feb 06 2024 so this will give us Jan 06 2023
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); // this will give the lastmonth from the prev month, ex : if prev month is Jan 2024 06 then then it will give Dec 2023 01 

    try {
        const income = await Order.aggregate([
            {$match : {createdAt :{$gte : previousMonth}}}, //This wil get order which is greater then prev - month
            {
                $project:{
                    month : { $month: "$createdAt"}, // Order which are created on the prev -month with sales 
                    sales : "$amount"
                }
            },
            {
                $group:{
                    _id:"$month", // grouping them to get per month sales , 
                    total :{$sum:"$sales"} // Calculate total sales for each month
                }
            }
        ])
        
        return res.status(200).json(income)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Error in getting income"
        })
    }
}
