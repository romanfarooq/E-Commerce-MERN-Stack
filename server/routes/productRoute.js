import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProduct)
router.get("/getAll", getAllProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get/:id", getProductDetails);

export default router;