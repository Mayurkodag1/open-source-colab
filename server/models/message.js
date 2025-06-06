import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming a User model exists for contributors/maintainers
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' // Assuming a Project model exists
    },
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue' // Assuming an Issue model exists
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['user', 'mentor'],
        default: 'user'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Add index for faster querying based on project or issue
messageSchema.index({ project: 1 });
messageSchema.index({ issue: 1 });

const Message = mongoose.model('Message', messageSchema);

export default Message;
