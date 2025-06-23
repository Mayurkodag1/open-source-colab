import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../ContributorsSearchProjects/ContributorsSearchProjects.css";

function ContributorsSearchProjects() {
    const [search, setSearch] = useState('');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [issues, setIssues] = useState([]);
    const [creatingIssue, setCreatingIssue] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [recommendedProjects, setRecommendedProjects] = useState([]);

    const [issueForm, setIssueForm] = useState({
        title: '',
        description: '',
        status: 'Open',
        priority: 'Medium'
    });

    const fetchRecommendedProjects = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/contributor/recommendations/projects', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRecommendedProjects(response.data.projects || []);
        } catch (error) {
            console.error("Error fetching recommended projects:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchRecommendedProjects();
    }, []);

    const fetchProjects = async (searchTerm = '') => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/contributor/projects/search', {
                params: { search: searchTerm, skills: '' },
                headers: { Authorization: `Bearer ${token}` }
            });
            setProjects(response.data.data);
        } catch (error) {
            console.error("Error fetching projects:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateIssue = async (projectId) => {
        if (!projectId) {
            console.error('❌ Project ID is null. Cannot create issue.');
            alert("Project not selected. Cannot create issue.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:3000/api/maintainer/projects/${projectId}/issues`,
                issueForm,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setIssues(prev => [...prev, response.data]);
            setIssueForm({ title: '', description: '', status: 'Open', priority: 'Medium' });
            setCreatingIssue(false);
        } catch (error) {
            console.error('❌ Error creating issue:', error.response?.data || error.message);
        }
    };

    const handleSearchClick = () => {
        fetchProjects(search);
    };

    const handleShowIssues = async (projectId) => {
        setSelectedProjectId(projectId);
        setShowModal(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/maintainer/issues', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const filteredIssues = response.data.filter(
                issue => issue.project && issue.project._id === projectId
            );
            setIssues(filteredIssues);
        } catch (error) {
            console.error('Error fetching issues:', error.response?.data || error.message);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setIssues([]);
        setSelectedProjectId(null);
        setCreatingIssue(false);
    };

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <h3>Recommended Projects</h3>
            </div>

            <div className='container mb-4'>
                <div className="row">
                    {recommendedProjects.length === 0 ? (
                        <div className="col-12 text-center">
                            <p>No recommended projects available.</p>
                        </div>
                    ) : (
                        recommendedProjects.map(project => (
                            <div className="col-md-4 mb-3" key={project._id}>
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">ProjectTitle: {project.title}</h5>
                                        <p className="card-text">Description: {project.description}</p>
                                        <p><strong>Status:</strong> {project.status}</p>
                                        <p><strong>Skills:</strong> {project.skills.map(skill => skill.name).join(', ')}</p>
                                        <button
                                            className="btn btn-sm btn-success mt-2"
                                            onClick={() => {
                                                setSelectedProjectId(project._id);
                                                setCreatingIssue(true);
                                            }}
                                        >
                                            Create Issue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="container my-4 d-flex justify-content-center">
                <div className="input-group w-50">
                    <input
                        type="text"
                        className="form-control contributors-searchbar-size"
                        placeholder="Search here..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-light contributors-btn-size"
                        type="button"
                        onClick={handleSearchClick}
                    >
                        🔍
                    </button>
                </div>
            </div>

            <div className='container mb-5'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className='table'>
                        <thead className='contributors-search-table-head'>
                            <tr>
                                <th>Project ID</th>
                                <th>Project Title</th>
                                <th>Project Description</th>
                                <th>View Issues</th>
                                <th>Project Status</th>
                                <th>Chat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No projects found.</td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project._id}>
                                        <td>{project._id}</td>
                                        <td>{project.title}</td>
                                        <td>{project.description}</td>
                                        <td>
                                            <button
                                                className='btn btn-secondary'
                                                onClick={() => handleShowIssues(project._id)}
                                            >
                                                Show Issue
                                            </button>
                                        </td>
                                        <td>{project.status}</td>
                                        <td>
                                            <Link to={`/maintainer-communicate-contributor/${project._id}`}>
                                                <button className="btn btn-sm btn-primary">Chat</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Issues for Project ID: {selectedProjectId}</h5>
                                <button type="button" className="ms-5 btn btn-danger" onClick={handleCloseModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {issues.length === 0 ? (
                                    <p>No issues found for this project.</p>
                                ) : (
                                    <ul className="list-group">
                                        {issues.map(issue => (
                                            <li key={issue._id} className="list-group-item">
                                                <h6>Title: {issue.title} <span className="badge bg-secondary">{issue.status}</span></h6>
                                                <p>{issue.description}</p>
                                                <small>Priority: {issue.priority} | Created: {new Date(issue.createdAt).toLocaleString()}</small>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="modal-footer d-flex justify-content-between">
                                <button
                                    className='btn btn-success'
                                    onClick={() => setCreatingIssue(true)}
                                >
                                    Create issue
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

           {creatingIssue && (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Create New Issue for Project ID: {selectedProjectId}</h5>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setCreatingIssue(false)}
                    />
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            className="form-control"
                            value={issueForm.title}
                            onChange={(e) => setIssueForm({ ...issueForm, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            value={issueForm.description}
                            onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            className="form-control"
                            value={issueForm.status}
                            onChange={(e) => setIssueForm({ ...issueForm, status: e.target.value })}
                        >
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Priority</label>
                        <select
                            className="form-control"
                            value={issueForm.priority}
                            onChange={(e) => setIssueForm({ ...issueForm, priority: e.target.value })}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleCreateIssue(selectedProjectId)}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setCreatingIssue(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
)}

        </div>
    );
}

export default ContributorsSearchProjects;
