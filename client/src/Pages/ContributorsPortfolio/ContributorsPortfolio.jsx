import React, { useEffect, useState } from 'react';
import "../ContributorsPortfolio/ContributorsPortfolio.css";
import Select from 'react-select';

function ContributorsPortfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);  // State for delete confirmation modal
  const [availableSkills, setAvailableSkills] = useState([]); // All available skills
  const [contributionEvents, setContributionEvents] = useState([]); // New state for contribution events
  const [contributionLoading, setContributionLoading] = useState(true); // New state for contribution loading

const skillOptions = availableSkills.map(skill => ({
  value: skill._id, // ✅ use skill ID
  label: skill.name
}));



  const [formData, setFormData] = useState({
    summary: '',
    skills: [],
    projects: '',
    linkedin: '',
    github: ''
  });
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/admin/skills', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching skills: ${response.status}`);
        }

        const data = await response.json();
        setAvailableSkills(data); // Set the fetched skills
      } catch (err) {
        console.error('Error fetching skills:', err);
      }
    };

    fetchSkills();
  }, []);


  useEffect(() => {
    const fetchContributionEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/contributions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching contribution events: ${response.status}`);
        }

        const data = await response.json();
        setContributionEvents(data.contributionEvents);
      } catch (err) {
        console.error('Error fetching contribution events:', err);
      } finally {
        setContributionLoading(false);
      }
    };

    fetchContributionEvents();
  }, []);

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
          console.log('Fetched portfolio data:', data);

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
        skills: portfolio.skills || [],

        projects: portfolio.projects?.join('\n') || '',
        linkedin: portfolio.socialLinks?.linkedin || '',
        github: portfolio.socialLinks?.github || ''
      });
    } else {
      // Reset the form if no portfolio is present
      setFormData({
        summary: '',
        skills: [],
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

    const projectList = formData.projects
      .split('\n') // break lines into array
      .map(p => p.trim())
      .filter(Boolean);

    const response = await fetch('http://localhost:3000/api/contributor/portfolios', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary: formData.summary,
        skills: formData.skills,
        projects: projectList, // ✅ now an array
        socialLinks: {
          linkedin: formData.linkedin,
          github: formData.github
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Update error response:', errorData);
      throw new Error(errorData.message || 'Failed to update portfolio');
    }

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



      const projectList = formData.projects
        .split('\n') // assumes each line is a separate project
        .map(p => p.trim())
        .filter(Boolean); // remove empty lines

      const requestBody = {
        summary: formData.summary,
        skills: formData.skills, // Already an array

        projects: projectList, // 🔁 this is now an array, as required
        socialLinks: {
          linkedin: formData.linkedin,
          github: formData.github
        }
      };

      console.log("Sending portfolio:", requestBody);

      const response = await fetch('http://localhost:3000/api/contributor/portfolios', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error('Add error response:', err);
        alert(`Failed to add portfolio: ${err.errors?.[0]?.msg || 'Unknown error'}`);
        return;
      }

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
        skills: [],
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

  if (loading || contributionLoading) return null;

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

          {/* <p className='contributors-portfolio-session-three-main-card-head'>Skills</p>
          <Select
            isMulti
            options={skillOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formData.skills.map(skill => ({ value: skill, label: skill }))}
            onChange={(selectedOptions) =>
              setFormData(prev => ({
                ...prev,
                skills: selectedOptions.map(option => option.value)
              }))
            }
          /> */}

                 <p className='contributors-portfolio-session-three-main-card-head'>Skills</p>
          
          <Select
            isMulti
            options={skillOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formData.skills.map(id => {
              const skill = skillOptions.find(opt => opt.value === id || opt.id === id);
              return skill ? { value: skill.value, label: skill.label } : null;
            }).filter(Boolean)}
            onChange={(selectedOptions) =>
              setFormData(prev => ({
                ...prev,
                skills: selectedOptions.map(option => option.value) // this will be IDs now
              }))
            }
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

      <div className="contributors-portfolio-session-three d-flex justify-content-center mb-5">
        <div className="card contributors-portfolio-session-three-main-card">
          <p className='contributors-portfolio-session-three-main-card-head'>Contribution Events</p>
          {contributionEvents.length > 0 ? (
            <ul className="list-group w-100">
              {contributionEvents.map((event) => (
                <li key={event._id} className="list-group-item mb-3">
                  <h5>{event?.title}</h5>
                  <p><strong>Event Type:</strong> {event.eventType}</p>
                  <p><strong>Description:</strong> {event.description || event.project? event.eventType.replace(/_/g," ")  + " for " + event.project.title:event.eventType.replace(/_/g," ")}</p>
                  {event.project && <p><strong>Project:</strong> {event.project?.title} (id: {event.project?._id})</p>}
                  {event.link && <p><strong>Link:</strong> <a href={event.link} target="_blank" rel="noopener noreferrer">{event.link}</a></p>}
                  <p><strong>Date:</strong> {new Date(event.timestamp).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No contribution events found.</p>
          )}
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
