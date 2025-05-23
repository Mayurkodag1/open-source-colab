import mongoose from 'mongoose';

const contributionEventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  eventType: {
    type: String,
    required: true,
    enum: [
      'maintainer_issue_created',
      'maintainer_issue_resolved',
      'maintainer_project_created',
      'contributor_issue_resolved',
    ],
  },
  eventDetails: {
    type: Object,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ContributionEvent = mongoose.model('ContributionEvent', contributionEventSchema);

export default ContributionEvent;