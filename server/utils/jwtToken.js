import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRE = process.env.JWT_EXPIRE_TIME;
const COOKIE_EXPIRE = process.env.COOKIE_EXPIRE_TIIME;

// Create Token and saving in cookie
const sendToken = (user, statusCode, res) => {

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

  // options for cookie
  const options = {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

export default sendToken;
