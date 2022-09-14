import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Create New Order
export const newOrder = async (req, res) => {
  try {

    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({ success: true, order });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Order -- Admin
export const getSingleOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    }

    res.status(200).json({ success: true, order });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get LoggedIn User Orders
export const myOrders = async (req, res) => {
  try {

    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "Orders Not Found" });
    }

    res.status(200).json({ success: true, orders });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Orders -- Admin
export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find();

    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "Orders Not Found" });
    }

    let totalAmount = 0;
    orders.forEach(order => totalAmount += order.totalPrice);

    res.status(200).json({ success: true, totalAmount, orders });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Order Status -- Admin
export const updateOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    }

    if (order.orderStatus === "delivered") {
      return res
        .status(404)
        .json({ success: false, message: "You have already delivered this order" });
    }


    order.orderStatus = req.body.status.toLowerCase();

    if (req.body.status.toLowerCase() === "delivered") {
      order.deliveredAt = Date.now();
    }

    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });

    await order.save();

    res.status(200).json({success: true, message: "Updated Order Status"})

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

async function updateStock(id, quantity) {

  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save();

}

// Delete Order -- Admin
export const deleteOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    }

    await order.remove();

    res
      .status(200)
      .json({ success: true, message: "Order Deleted Succesfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};