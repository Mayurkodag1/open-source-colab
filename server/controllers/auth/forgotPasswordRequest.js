import User from "../../models/user.js";
import crypto from "crypto";
import { validationResult } from "express-validator";
import sendEmail from "../../utils/sendEmail.js";

export const forgotPasswordRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Set token and expiry on user model
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 3600000; // Token valid for 1 hour

    await user.save();

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`; // Example URL

    // Email message
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Token",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });

    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      console.error(err.message);
      res.status(500).send("Email could not be sent");
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};