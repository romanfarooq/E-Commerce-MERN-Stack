import Product from "../models/productModel.js";

// Create Product -- Admin
export const createProduct = async (req, res) => {
  try {

    req.body.user = req.user._id;
    const product = await Product.create(req.body);

    res.status(201).json({ success: true, product });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {

    if (req.query.keyword) {
      req.query.name = { $regex: req.query.keyword, $options: "i" };
    }

    const resPerPage = Number(req.query.limit) || 6;
    const currentPage = Number(req.query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete req.query[key]);

    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    const productsCount = await Product.countDocuments();
    let products = await Product.find(JSON.parse(queryStr))
    const filteredProductsCount = products.length;

    products = await Product.find(JSON.parse(queryStr))
      .limit(resPerPage)
      .skip(skip);

    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "Products Not Found" });
    }

    res.status(200).json({ success: true, productsCount, resPerPage, filteredProductsCount, products });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Product -- Admin
export const updateProduct = async (req, res) => {
  try {

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, product });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Product -- Admin
export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    await product.remove();

    res
      .status(200)
      .json({ success: true, message: "Product deleted Successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create or Update Product Review
export const createProductReview = async (req, res) => {
  try {

    const { _id, name } = req.user;
    const { rating, comment, productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === _id.toString()
    );
    
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === _id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      const review = {
        user: _id,
        name,
        rating: Number(rating),
        comment,
      };
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let sum = 0;
    product.reviews.forEach(rev => sum += rev.rating);

    product.ratings = sum / product.reviews.length;

    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Review added succesfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Reviews of Products
export const getProductReviews = async (req, res) => {
  try {

    const product = await Product.findById(req.query.productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    res.status(200).json({ success: true, reviews: product.reviews });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Review of Product
export const deleteReview = async (req, res) => {
  try {

    const product = await Product.findById(req.query.productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    const reviews = product.reviews.filter(
      (rev) => rev.user.toString() !== req.query.reviewId.toString()
    );

    let sum = 0;
    reviews.forEach((rev) => (sum += rev.rating));

    const numOfReviews = reviews.length;

    const ratings = sum / numOfReviews;

    await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, ratings, numOfReviews },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ success: true, reviews: "Review Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
