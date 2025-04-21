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
    // chatLink: { // Future implementation
    //   type: String,
    // },
    maintainer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Assuming a User model exists and maintainers are users
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;