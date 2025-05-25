import React, { useEffect, useState } from 'react';
import imgone from "../../assets/Images/mainatinermanage.svg";
import { Link } from 'react-router-dom';

function MaintainerManageIssue({ projectId }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const [editIssue, setEditIssue] = useState(null); // currently editing issue
  const [formData, setFormData] = useState({ title: '', description: '', status: '', priority: '' });

  const handleUpdate = () => {
    const token = localStorage.getItem('token');
    console.log("Save clicked", formData);

    // Get the full issue object
    const issueToUpdate = issues.find(issue => issue._id === editIssue);

    if (!token || !editIssue || !issueToUpdate?.project?._id) {
      console.error("Missing token/editIssue/projectId");

      return;
    }

    const projectId = issueToUpdate.project._id;

    console.log("Resolved projectId:", projectId);

    fetch(`http://localhost:3000/api/maintainer/projects/${projectId}/issues/${editIssue}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Update failed: ${res.status} - ${errorText}`);
        } else {
          alert("Updated Successfully")
        }
        return res.json();
      })
      .then(updated => {
        setIssues(prev =>
          prev.map(issue => (issue._id === updated._id ? updated : issue))
        );
        setEditIssue(null);
      })
      .catch(err => {
        console.error('Update failed:', err);
        alert('Failed to update issue');
      });
  };

  const handleDelete = (issueId) => {
    const token = localStorage.getItem('token');
    const issueToDelete = issues.find(issue => issue._id === issueId);

    const projectId = issueToDelete?.project?._id; // ✅ Get projectId from issue object

    if (!token || !projectId) {
      console.error("Missing token or project ID");
      alert("Only the issued Maintainer can Delete !!")
      return;
    }

    if (!window.confirm("Are you sure you want to delete this issue?")) return;

    fetch(`http://localhost:3000/api/maintainer/projects/${projectId}/issues/${issueId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          console.log(Error)
          throw new Error(`Delete failed: ${res.status} - ${errorText}`);

        }
        return res.json();
      })
      .then(data => {
        console.log('Deleted issue:', data);
        setIssues(prev => prev.filter(issue => issue._id !== issueId));
      })
      .catch(err => {
        console.error('Delete failed:', err);
        if (err.message.includes('401') && err.message.includes('Not authorized')) {
          alert('Only the issued maintainer can delete this issue.');
        } else {
          alert('Failed to delete issue.');
        }
      });
  };


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Authentication token is missing.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/api/maintainer/issues`, {
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
        console.log("Fetched issues:", data); 
        setIssues(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching issues:', error);
        setError('Error loading issues.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Loading issues...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>

      <div className='d-flex justify-content-center mt-5'>
        <div className="maintainer-manage-proj-sec-one">
          <div className='mt-5'>
            <p className='maintainer-manage-proj-sec-one-para'>Manage Issue</p>
            <p className='maintainer-manage-proj-sec-one-paraone'>An overview of all the project in the past 3 weeks</p>
          </div>
          <div className='mt-4'>
            <img src={imgone} alt="Overview" />
          </div>
        </div>
      </div>

      <div className='maintainers-manage-proj-sec-between'>
        <div className='d-flex justify-content-evenly'>
          <Link to='/maintainer-manage-project'><button className='btn' >Project Overview</button></Link>
          <Link to='/maintainer-manage-issue'>  <button className='btn' >Manage Issue</button></Link>
        </div>
      </div>

      <hr className='container maintainers-manage-proj-sec-between-hr' />

      {editIssue && (
        <div className="container mt-4">
          <h5>Edit Issue</h5>
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title" className="form-control mb-2" />
          <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" className="form-control mb-2" />
          <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="form-control mb-2">
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="form-control mb-2">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button className="btn btn-success" onClick={handleUpdate}>Save</button>
          <button className="btn btn-secondary ms-2" onClick={() => setEditIssue(null)}>Cancel</button>
        </div>
      )
      }

      <div className="maintainer-manage-proj-sec-three">
        <div className="table-container">
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
                <th>Update</th>
                <th>Delete</th>
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
                 <td>{issue.createdBy ? `${issue.createdBy.firstName} ${issue.createdBy.lastName}` : 'N/A'}</td>

                  <td>{new Date(issue.createdAt).toLocaleString()}</td>
                  <td>{new Date(issue.updatedAt).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => {
                      setEditIssue(issue._id);
                      setFormData({
                        title: issue.title,
                        description: issue.description,
                        status: issue.status,
                        priority: issue.priority
                      });
                    }}>✏️</button>

                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(issue._id)}>🗑️</button>

                  </td>
                </tr>
              ))}
              {issues.length === 0 && (
                <tr>
                  <td colSpan="8">No issues found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>

  )
}

export default MaintainerManageIssue;
