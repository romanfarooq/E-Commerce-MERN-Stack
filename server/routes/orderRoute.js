import express from "express";
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/orderController.js";
import { isAdmin, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticatedUser, newOrder);
router.get("/admin/get/:id", isAuthenticatedUser, isAdmin, getSingleOrder);
router.get("/me", isAuthenticatedUser, myOrders);
router.get("/admin/getAll", isAuthenticatedUser, isAdmin, getAllOrders);
router.put("/admin/update/:id", isAuthenticatedUser, isAdmin, updateOrder);
router.delete("/admin/delete/:id", isAuthenticatedUser, isAdmin, deleteOrder);

export default router;