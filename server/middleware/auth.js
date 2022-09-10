import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const jwtKey = process.env.JWT_SECRET_KEY;

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login to acces this resource",
      });
    }
    const decodedData = jwt.verify(token, jwtKey);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: `Role: ${req.user.role} is allowed to access this resourse`,
    });
  }
  next();
};
