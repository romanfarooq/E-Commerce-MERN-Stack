import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import sendToken from "../utils/jwtToken.js";

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
    sendToken(user, 200, res);
  } catch (error) {
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
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  try {
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };
    res
      .status(200)
      .cookie("token", null, options)
      .json({ success: true, message: "Loged Out Succesfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
