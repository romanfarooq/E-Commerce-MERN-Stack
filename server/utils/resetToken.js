import crypto from "crypto";

const getResetPasswordToken = (user) => {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

  return resetToken;
};

export default getResetPasswordToken;