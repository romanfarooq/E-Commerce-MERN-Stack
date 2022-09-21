import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import sendToken from "../utils/jwtToken.js";
import getResetPasswordToken from "../utils/resetToken.js";
import sendEmail from "../utils/sendEmail.js";

// Register User
export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should have atleast 8 characters",
      });
    }

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
  try {

    const { email, password } = req.body;

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

// Forgrot Password
export const forgotPassword = async (req, res) => {
  try {

    if (!validator.isEmail(req.body.email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter a valid Email" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Enter correct email" });
    }

    const resetToken = getResetPasswordToken(user);

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/users/reset/${resetToken}`;
    const message = `Your password token is :-\n\n${resetPasswordUrl}\n\nIf you have not requested this email then please ignore it`;
    
    sendEmail(
      { email: user.email, subject: "E-Commerence Password Recovery", message },
      user
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} succesfully`,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Your User Details
export const getUserDetails = async (req, res) => {
  try {

    const user = await User.findById(req.user._id)

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid User" });
    }

    res.status(200).json({ success: true, user });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    const comparePass = await bcrypt.compare(oldPassword, user.password);

    if (!comparePass) {
      return res
        .status(400)
        .json({ success: false, message: "Old Password is Incorrect" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New Password should have atleast 8 characters",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New and confirm Passwords doesn't match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPassword, salt);
    user.password = hashPass;

    await user.save();

    sendToken(user, 200, res);

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Your Profile
export const updateProfile = async (req, res) => {
  try {

    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    // I will add cloudinary later

    await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Profile Updated Succesfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Users -- Admin
export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find();

    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "No User Found" });
    }

    res.status(200).json({ success: true, users });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single User -- Admin
export const getUserDetailsAdmin = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Enter Correct Id" });
    }

    res.status(200).json({ success: true, user });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update User Role -- Admin
export const updateUserRole = async (req, res) => {
  try {

    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role.toLowerCase(),
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Role Updated Succesfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete User -- Admin
export const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    await user.remove();

    res
      .status(200)
      .json({ success: true, message: "User Deleted Succesfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
