import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/osc");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// User model (same as your schema)
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["contributor", "maintainer"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio'
  }
},{timestamps: true});

UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model("User", UserSchema);

// Function to update user password
const updateUserPassword = async (email, newPassword) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`User with email ${email} not found`);
      return;
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    console.log(`Password for user ${email} has been updated successfully`);
  } catch (err) {
    console.error("Error updating password:", err);
  }
};

// Main function to run the script
const main = async () => {
  // Get arguments from command line
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log("Usage: node resetPassword.js <email> <newPassword>");
    process.exit(1);
  }

  const email = args[0];
  const newPassword = args[1];

  await connectDB();
  await updateUserPassword(email, newPassword);
  
  // Disconnect from MongoDB
  mongoose.disconnect();
};

main();