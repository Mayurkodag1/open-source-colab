import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  summary: {
    type: String,
  },
  skills: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  },
  projects: {
    type: [String],
  },
  socialLinks: {
    type: {
      linkedin: {
        type: String,
      },
      github: {
        type: String,
      },
    },
  },
});

export default mongoose.model("Portfolio", PortfolioSchema);