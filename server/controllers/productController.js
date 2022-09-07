import Product from "../models/productModel.js";

// Create Product -- Admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log("status code", 500);
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    if (req.query.name) {
      req.query.name = { $regex: req.query.name, $options: "i" };
    }
    const resultPerPage = 4;
    const currentPage = Number(req.query.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete req.query[key]);
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    const products = await Product.find(JSON.parse(queryStr)).limit(resultPerPage).skip(skip);
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Product Details
export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Product -- Admin
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({ success: false, message: "Product Not Found" });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
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
    res.status(200).json({ success: true, message: "Product deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
