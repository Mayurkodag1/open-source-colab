import React, { useState, useEffect } from 'react';
import "../MaintainerManageProjectPage/MaintainerManageProject.css";
import imgone from "../../assets/Images/mainatinermanage.svg";
import axios from 'axios';
import { Link } from 'react-router-dom';


const CreateIssueModal = ({ show, onClose, projectId, token }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/maintainer/projects/${projectId}/issues`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res)
      alert('Issue created successfully!');
      onClose(); // Close modal after success
    } catch (error) {
      alert('Failed to create issue');
      console.error(error);
    }
  };

  if (!show) return null;
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Create Issue</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input
                name="title"
                placeholder="Title"
                className="form-control mb-2"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                className="form-control mb-2"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <select name="status" className="form-select mb-2" value={formData.status} onChange={handleChange}>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <select name="priority" className="form-select" value={formData.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary" type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function MaintainerManageProject() {
   const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: ''
  });
  const [editMap, setEditMap] = useState({});

  const isChatOn = false;

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/maintainer/projects", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or bad request");
        return res.json();
      })
      .then((data) => {
        const projectsArray = Array.isArray(data) ? data : data.projects;
        setProjects(projectsArray);
        const map = {};
        projectsArray.forEach(p => {
          map[p._id] = p.status;
        });
        setStatusMap(map);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const getColor = (status) => {
    switch (status) {
      case 'Open': return 'orange';
      case 'In Progress': return 'green';
      case 'Closed': return 'red';
      default: return 'black';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setStatusMap(prev => ({ ...prev, [id]: newStatus }));
  };

  const deleteProject = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/maintainer/projects/${projectToDelete}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete project");
        return res.json();
      })
      .then(() => {
        setProjects(prev => prev.filter(p => p._id !== projectToDelete));
        setShowModal(false);
        setProjectToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
        alert("Error deleting project or unauthorized.");
      });
  };

  const handleCreateProject = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/maintainer/projects", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProject)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create project");
        return res.json();
      })
      .then(data => {
        setProjects(prev => [data, ...prev]);
        setNewProject({ title: '', description: '', status: 'Open' });
      })
      .catch(err => {
        console.error("Error creating project:", err);
        alert("Error creating project or unauthorized.");
      });
  };

  const handleUpdateProject = async (projectId) => {
    const data = editMap[projectId];
    const token = localStorage.getItem("token");

    if (!data || !data.title || !data.description) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/maintainer/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update');

      const updated = await response.json();
      alert('Project updated successfully');

      setProjects((prev) =>
        prev.map((proj) => (proj._id === updated._id ? updated : proj))
      );

      setEditMap((prev) => {
        const newMap = { ...prev };
        delete newMap[projectId];
        return newMap;
      });
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Update failed');
    }
  };




  return (

    <div>

      <div className='d-flex justify-content-center mt-5'>
        <div className="maintainer-manage-proj-sec-one">
          <div className='mt-5'>
            <p className='maintainer-manage-proj-sec-one-para'>Overview</p>
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

      <div className='container d-flex justify-content-center'>
        <div className="card p-3 mb-3 shadow-sm w-75 ">
          <h5>Add New Project</h5>
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={handleCreateProject}
                disabled={!newProject.title || !newProject.description}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="maintainer-manage-proj-sec-three">
        <div className="table-container">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="table-warning">
              <tr>
                <th>Project ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Chat</th>
                <th>Add Issue</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj._id}>
                  <td>{proj._id}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editMap[proj._id]?.title || proj.title}
                      onChange={(e) =>
                        setEditMap((prev) => ({
                          ...prev,
                          [proj._id]: {
                            ...prev[proj._id],
                            title: e.target.value,
                            description: prev[proj._id]?.description || proj.description
                          }
                        }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editMap[proj._id]?.description || proj.description}
                      onChange={(e) =>
                        setEditMap((prev) => ({
                          ...prev,
                          [proj._id]: {
                            ...prev[proj._id],
                            title: prev[proj._id]?.title || proj.title,
                            description: e.target.value
                          }
                        }))
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={statusMap[proj._id] || 'Open'}
                      onChange={(e) => handleStatusChange(proj._id, e.target.value)}
                      style={{ color: getColor(statusMap[proj._id]) }}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    {isChatOn ? (
                      <span>Chat <span className="d-inline-block rounded-circle bg-success" style={{ width: '10px', height: '10px' }}></span></span>
                    ) : (
                      <span>Chat <span className="d-inline-block rounded-circle bg-secondary" style={{ width: '10px', height: '10px' }}></span></span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setSelectedProjectId(proj._id);
                        setShowIssueModal(true);
                      }}
                    >
                      ADD
                    </button>


                  </td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleUpdateProject(proj._id)}>✏️</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => { setProjectToDelete(proj._id); setShowModal(true); }}>🗑️</button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="7">No projects found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this project?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={deleteProject}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
       <CreateIssueModal
        show={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        projectId={selectedProjectId}
        token={token}
      />
    </div>
  );
}

export default MaintainerManageProject;
