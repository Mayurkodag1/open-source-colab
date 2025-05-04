import React, { useEffect, useState } from 'react';

function MaintainerManageIssue({ projectId }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const token = localStorage.getItem('token');

    fetch(`http://localhost:3000/api/maintainer/projects/${projectId}/issues`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch issues');
        return res.json();
      })
      .then(data => {
        setIssues(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching issues:', error);
        setLoading(false);
      });
  }, [projectId]);

  if (!projectId) return <p className="text-danger">Project ID is required.</p>;
  if (loading) return <p className="text-center mt-5">Loading issues...</p>;

  return (
    <div className="maintainer-manage-proj-sec-three">
      <div className="table-container">
        <h5 className="text-center mb-3">Issues for Project ID: {projectId}</h5>
        <table className="table table-bordered text-center shadow-sm">
          <thead className="table-warning">
            <tr>
              <th>Issue ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue._id}</td>
                <td>{issue.title}</td>
                <td>{issue.description}</td>
                <td>{issue.status}</td>
                <td>{issue.priority}</td>
                <td>{issue.createdBy}</td>
                <td>{new Date(issue.createdAt).toLocaleString()}</td>
                <td>{new Date(issue.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
            {issues.length === 0 && (
              <tr>
                <td colSpan="8">No issues found for this project.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintainerManageIssue;
