import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProductDetails,
  getProductReviews,
  updateProduct
} from "../controllers/productController.js";
import { isAdmin, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", isAuthenticatedUser, isAdmin, createProduct);
router.get("/getAll", getAllProducts);
router.put("/update/:id", isAuthenticatedUser, isAdmin, updateProduct);
router.delete("/delete/:id", isAuthenticatedUser, isAdmin, deleteProduct);
router.get("/get/:id", getProductDetails);
router.put("/review/create", isAuthenticatedUser, createProductReview);
router.get("/review/getAll", getProductReviews);
router.delete("/review/delete", isAuthenticatedUser, deleteReview);

export default router;
