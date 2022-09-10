import express from "express";
import { loginUser, logoutUser, registerUser, forgotPassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/forgot", forgotPassword)

export default router;