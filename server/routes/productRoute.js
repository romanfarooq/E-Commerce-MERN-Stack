import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from "../controller/productController.js";

const router = express.Router();

router.post("/products/create", createProduct)
router.get("/products/getAll", getAllProducts);
router.put("/products/update/:id", updateProduct);
router.delete("/products/delete/:id", deleteProduct);
router.get("/products/get/:id", getProductDetails);

export default router;