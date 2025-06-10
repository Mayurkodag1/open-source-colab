import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import config from "config";
import { check, validationResult } from "express-validator";

export const contributorRegister = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Passwords do not match" }] });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
      role: "contributor",
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      import.meta.env.VITE_JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, id: user._id });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
