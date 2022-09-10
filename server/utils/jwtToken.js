import jwt from "jsonwebtoken";

const jwtKey = process.env.JWT_SECRET_KEY;
const jwtExpiryTime = process.env.JWT_EXPIRE_TIME;
const cookieExpiryTime = process.env.COOKIE_EXPIRE_TIME;

// Create Token and saving in cookie
const sendToken = (user, statusCode, res) => {

  const token = jwt.sign({ id: user._id }, jwtKey, { expiresIn: jwtExpiryTime });

  // options for cookie
  const options = {
    expires: new Date(Date.now() + cookieExpiryTime * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

export default sendToken;
