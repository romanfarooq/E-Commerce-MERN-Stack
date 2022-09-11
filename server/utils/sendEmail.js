import nodemailer from "nodemailer";

const smptService = process.env.SMPT_SERVICE;
const smptMail = process.env.SMPT_MAIL;
const smptPassword = process.env.SMPT_PASSWORD;

const sendEmail = async (options, user) => {
  try {
    const tarnspoter = nodemailer.createTransport({
      service: smptService,
      auth: {
        user: smptMail,
        pass: smptPassword,
      },
    });
    const mailOptions = {
      from: smptMail,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    await tarnspoter.sendMail(mailOptions);
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    res.status(500).json({ success: false, message: error.message });
  }
};

export default sendEmail;
