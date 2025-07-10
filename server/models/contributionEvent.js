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
  title: {
    type: String,
    required: false,
  },
  description:{
    type:String
  },
  eventType: {
    type: String,
    required: true,
    enum: [
      'maintainer_issue_created',
      'contributor_issue_created',
      'maintainer_issue_resolved',
      'maintainer_project_created',
      'contributor_issue_resolved',
      'pull_request_opened',
      'pull_request_merged',
      'code_committed',
      'issue_opened',
      'issue_commented',
      'issue_closed',
      'issue_triaged',
      'pull_request_reviewed',
      'pull_request_approved',
      'pull_request_changes_requested',
      'documentation_submitted',
      'documentation_reviewed',
      'discussion_participated',
      'user_helped',
      'project_created',
      'project_approved'
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