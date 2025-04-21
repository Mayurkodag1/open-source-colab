import React, { useEffect, useState } from 'react';
import "../ContributorsPortfolio/ContributorsPortfolio.css";

function ContributorsPortfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);  // State for delete confirmation modal

  const [formData, setFormData] = useState({
    summary: '',
    skills: '',
    projects: '',
    linkedin: '',
    github: ''
  });

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/contributor/portfolios', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setPortfolio(null);  // No portfolio found, set to null
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          setPortfolio(data && Object.keys(data).length > 0 ? data : null);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setPortfolio(null);  // Set portfolio to null if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const isExistingPortfolio = Boolean(portfolio && portfolio._id);

  useEffect(() => {
    if (portfolio) {
      setFormData({
        summary: portfolio.summary || '',
        skills: portfolio.skills?.join(', ') || '',
        projects: portfolio.projects?.join('\n') || '',
        linkedin: portfolio.socialLinks?.linkedin || '',
        github: portfolio.socialLinks?.github || ''
      });
    } else {
      // Reset the form if no portfolio is present
      setFormData({
        summary: '',
        skills: '',
        projects: '',
        linkedin: '',
        github: ''
      });
    }
  }, [portfolio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/contributor/portfolios', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: formData.summary,
          skills: formData.skills.split(',').map(skill => skill.trim()),
          projects: formData.projects.split('\n').map(project => project.trim()),
          socialLinks: {
            linkedin: formData.linkedin,
            github: formData.github
          }
        }),
      });

      if (!response.ok) throw new Error('Failed to update portfolio');
      const updated = await response.json();
      setPortfolio(updated);
      alert("Portfolio updated!");
    } catch (err) {
      console.error('Update error:', err);
      alert("Update failed.");
    }
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/contributor/portfolios', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: formData.summary,
          skills: formData.skills.split(',').map(skill => skill.trim()),
          projects: formData.projects.split('\n').map(project => project.trim()),
          socialLinks: {
            linkedin: formData.linkedin,
            github: formData.github
          }
        }),
      });

      if (!response.ok) throw new Error('Failed to add portfolio');
      const newData = await response.json();
      setPortfolio(newData);
      alert("Portfolio added!");
    } catch (err) {
      console.error('Add error:', err);
      alert("Failed to add portfolio.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/contributor/portfolios', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete portfolio');
      setPortfolio(null);  // Clear the state after successful deletion
      setFormData({
        summary: '',
        skills: '',
        projects: '',
        linkedin: '',
        github: ''
      });  // Reset the form
      alert("Portfolio deleted!");
    } catch (err) {
      console.error('Delete error:', err);
      alert("Failed to delete portfolio.");
    } finally {
      setShowDeleteModal(false);  // Close the delete modal
    }
  };

  if (loading) return null;

  return (
    <div>
      <div className="contributors-portfolio-session-three d-flex justify-content-center mb-5">
        <div className="card contributors-portfolio-session-three-main-card">

          <p className='contributors-portfolio-session-three-main-card-head'>Portfolio ID</p>
          <input type='text' className='form-control' placeholder='ID' value={portfolio?._id || ''} readOnly />

          <div>
            <p className='contributors-portfolio-session-three-main-card-head'>Portfolio Summary</p>
            <textarea
              name="summary"
              className='form-control'
              cols={200}
              rows={5}
              value={formData.summary}
              onChange={handleChange}
            />
          </div>

          <p className='contributors-portfolio-session-three-main-card-head'>Skills</p>
          <input
            name="skills"
            type='text'
            className='form-control'
            value={formData.skills}
            onChange={handleChange}
          />

          <div>
            <p className='contributors-portfolio-session-three-main-card-head'>Project List</p>
            <textarea
              name="projects"
              className='form-control'
              cols={200}
              rows={5}
              value={formData.projects}
              onChange={handleChange}
            />
          </div>

          <div>
            <p className='contributors-portfolio-session-three-main-card-head'>Social Links</p>
            <ul className="list-unstyled">
              <li>
                <input
                  name="linkedin"
                  className="form-control mb-2"
                  placeholder="LinkedIn URL"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </li>
              <li>
                <input
                  name="github"
                  className="form-control"
                  placeholder="GitHub URL"
                  value={formData.github}
                  onChange={handleChange}
                />
              </li>
            </ul>
          </div>

          <div className='d-flex justify-content-end container'>
            <button
              className='btn btn-warning me-3'
              onClick={() => setShowModal(true)}
            >
              {isExistingPortfolio ? 'Update' : 'Add'}
            </button>

            {isExistingPortfolio && (
              <button className='btn btn-danger' onClick={() => setShowDeleteModal(true)}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Confirmation Modal for Update/Add */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isExistingPortfolio ? 'Confirm Update' : 'Confirm Add'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to {isExistingPortfolio ? 'update' : 'add'} your portfolio?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    isExistingPortfolio ? handleUpdate() : handleAdd();
                    setShowModal(false);
                  }}
                >
                  Yes, {isExistingPortfolio ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Confirmation Modal for Delete */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete your portfolio?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContributorsPortfolio;
