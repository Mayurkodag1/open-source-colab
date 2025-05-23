import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Open', 'In Progress', 'Closed'], // Example statuses, can be adjusted
      default: 'Open',
    },
    approval: {
      type: String,
      required: true,
      enum: ["Pending","Rejected","Approved"],
      default:"Pending"
    },
    // chat // Future feature, not implemented yet
    maintainer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Assuming a User model exists and maintainers are users
    },
    skills: {
      type: [String], // Array of strings for skills
      default: [],
    },
    repo_url: {
      type: String,
      required: false, // Or true, depending on your requirements
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ title: 'text', description: 'text' });

const Project = mongoose.model('Project', projectSchema);

export default Project;