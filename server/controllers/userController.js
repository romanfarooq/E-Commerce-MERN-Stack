import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRE = process.env.JWT_EXPIRE_TIME;

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashPass,
      avatar: { public_id: "This is sample id", url: "Profile Pic Url" },
    });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {expiresIn: JWT_EXPIRE});
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter a valid Email" });
    }
    if (validator.isEmpty(password)) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter a Password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Enter correct email" });
    }
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res
        .status(401)
        .json({ success: false, message: "Enter correct password" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {expiresIn: JWT_EXPIRE});
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
