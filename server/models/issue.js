import mongoose from 'mongoose';

const issueSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project', // Reference to the Project model
    },
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
      enum: ['Open', 'In Progress', 'Resolved'], // Example statuses
      default: 'Open',
    },
    priority: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High'], // Example priorities
      default: 'Low',
    },
    // chat // Future feature, not implemented yet
    createdBy: { // Could be maintainer or contributor
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Assuming a User model exists
    },
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;