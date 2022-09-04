import Product from "../models/productModel.js";

// Create Product -- Admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get Product Details
export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(500)
        .json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update Product -- Admin
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(500)
        .json({ success: false, message: "Product Not Found" });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete Product -- Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(500)
        .json({ success: false, message: "Product Not Found" });
    }
    await product.remove();
    res
      .status(200)
      .json({ success: true, message: "Product deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
