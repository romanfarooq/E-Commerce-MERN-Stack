import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from "../controllers/productController.js";
import {isAdmin, isAuthenticatedUser} from "../middleware/auth.js";

const router = express.Router();

router.post("/create", isAuthenticatedUser, createProduct)
router.get("/getAll", getAllProducts);
router.put("/update/:id", isAuthenticatedUser, isAdmin, updateProduct);
router.delete("/delete/:id", isAuthenticatedUser, isAdmin, deleteProduct);
router.get("/get/:id", getProductDetails);

export default router;