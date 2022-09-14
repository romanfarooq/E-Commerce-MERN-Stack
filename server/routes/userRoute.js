import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  forgotPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetailsAdmin,
  deleteUser,
  updateUserRole
} from "../controllers/userController.js";
import { isAdmin, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticatedUser, logoutUser);
router.post("/password/forgot", forgotPassword);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, updateProfile);
router.get("/admin/getAll", isAuthenticatedUser, isAdmin, getAllUsers);
router.get("/admin/get/:id", isAuthenticatedUser, isAdmin, getUserDetailsAdmin);
router.put("/admin/update/role/:id", isAuthenticatedUser, isAdmin, updateUserRole);
router.delete("/admin/delete/:id", isAuthenticatedUser, isAdmin, deleteUser);

export default router;
