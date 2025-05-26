import React, { useState } from 'react';
import "../ContributorsActivity/ContributorsActivity.css";
import axios from 'axios';

const eventTypeOptions = [
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
];

function ContributorsActivity() {
  const [eventType, setEventType] = useState(eventTypeOptions[0]);
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('Pending');  // Assuming you want to keep status
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const backendURL = "http://localhost:3000";

  // Replace this with how you actually get your auth token
  const token = localStorage.getItem('token');

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim() || !description.trim()) {
    setMessage('Title and Description are required.');
    return;
  }

  setLoading(true);
  setMessage(null);

  const payload = {
    eventType,
    title,
    projectId: projectId.trim() || undefined,
    description,
    link: link.trim() || undefined,
  };

  try {
    const response = await axios.post(
      `${backendURL}/api/contributions`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    setMessage(response.data.message || 'Contribution recorded successfully!');
    setTitle('');
    setProjectId('');
    setDescription('');
    setLink('');
    setEventType(eventTypeOptions[0]);

  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      setMessage(error.response.data.message || 'Failed to record contribution.');
    } else {
      // Network or other error
      setMessage('An error occurred while submitting. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className='d-flex justify-content-center'>
      <form
        className="card contributor-activty-card-size mb-5 p-4"
        onSubmit={handleSubmit}
      >
        <p className='contributors-activity-head'>Contribution Event Type</p>
        <select
          className='form-control mb-3'
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          {eventTypeOptions.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <p className='contributors-activity-head'>Title <span style={{color: 'red'}}>*</span></p>
        <input
          type='text'
          className='form-control mb-3'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <p className='contributors-activity-head'>Project ID (optional)</p>
        <input
          type='text'
          className='form-control mb-3'
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />

        <p className='contributors-activity-head'>Description <span style={{color: 'red'}}>*</span></p>
        <textarea
          className='form-control mb-3'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
        />

        <p className='contributors-activity-head'>Link (optional)</p>
        <input
          type='text'
          className='form-control mb-3'
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        {/* You can keep your status dropdown if you want; it's not in API request */}
        <div className='d-flex mb-3'>
          <p className='contributors-activity-head me-3'>Status</p>
          <select
            className='form-control contributors-activity-status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Success</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Contribution'}
        </button>

        {message && (
          <p className="mt-3" style={{ color: message.includes('successfully') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ContributorsActivity;
