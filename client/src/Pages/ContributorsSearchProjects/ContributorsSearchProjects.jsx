import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../ContributorsSearchProjects/ContributorsSearchProjects.css";

function ContributorsSearchProjects() {
    const [search, setSearch] = useState('');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [issues, setIssues] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [recommendedProjects, setRecommendedProjects] = useState([]);

const fetchRecommendedProjects = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/contributor/recommendations/projects', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Recommended Projects API Response:", response.data);  // 🔍 DEBUG
        setRecommendedProjects(response.data.projects || []);
    } catch (error) {
        console.error("Error fetching recommended projects:", error.response?.data || error.message);
    }
};

useEffect(() => {
    fetchProjects();
    fetchRecommendedProjects(); // also fetch recommendations
}, []);


    // Fetch projects
    const fetchProjects = async (searchTerm = '') => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/contributor/projects/search', {
                params: {
                    search: searchTerm,
                    skills: ''
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(response.data.data);
        } catch (error) {
            console.error("Error fetching projects:", error.response?.data || error.message);
        } finally {
            setLoading(false);
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
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
            <p className="card-text">Description :{project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Skills:</strong> {project.skills.map(skill => skill.name).join(', ')}</p>
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
                        aria-label="Search"
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
                                        <td>
                                            <select className='form-control' defaultValue={project.status}>
                                                <option>Pending</option>
                                                <option>Success</option>
                                            </select>
                                        </td>
                                        <td><button className="btn btn-sm btn-primary">Chat</button></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Issues for Project ID: {selectedProjectId}</h5>
                                <button type="button " className=" btn btn-danger close" onClick={handleCloseModal}>
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
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
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



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "../ContributorsSearchProjects/ContributorsSearchProjects.css";

// function ContributorsSearchProjects() {
//     const [search, setSearch] = useState('');
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // Fetch projects on component mount (or when explicitly triggered)
//     const fetchProjects = async (searchTerm = '') => {
//         try {
//             setLoading(true);
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:3000/api/contributor/projects/search', {
//                 params: {
//                     search: searchTerm,
//                     skills: ''
//                 },
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setProjects(response.data.data);
//             console.log("Fetched projects:", response.data.data);
//         } catch (error) {
//             console.error("Error fetching projects:", error.response?.data || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Initial fetch of all projects
//     useEffect(() => {
//         fetchProjects(); // fetch all projects on initial load
//     }, []);

//     const handleSearchClick = () => {
//         fetchProjects(search); // fetch with search input
//     };

//     return (
//         <div>
//             <div className="container my-4 d-flex justify-content-center">
//                 <div className="input-group w-50">
//                     <input
//                         type="text"
//                         className="form-control contributors-searchbar-size"
//                         placeholder="Search here..."
//                         aria-label="Search"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                     <button
//                         className="btn btn-outline-light contributors-btn-size"
//                         type="button"
//                         onClick={handleSearchClick}
//                     >
//                         🔍
//                     </button>
//                 </div>
//             </div>

//             <div className='container mb-5'>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <table className='table'>
//                         <thead className='contributors-search-table-head'>
//                             <tr>
//                                 <th>Project ID</th>
//                                 <th>Project Title</th>
//                                 <th>Project Description</th>
//                                 <th>Project Status</th>
//                                 <th>View Issues</th>
//                                 <th>Chat</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {projects.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="5">No projects found.</td>
//                                 </tr>
//                             ) : (
//                                 projects.map((project) => (
//                                     <tr key={project.id}>
//                                         <td>{project._id}</td>
//                                         <td>{project.title}</td>
//                                         <td>{project.description}</td>
//                                         <td><button className='btn btn-secondary'>Show Issue</button></td>
//                                         <td>
//                                             <select className='form-control' defaultValue={project.status}>
//                                                 <option>Pending</option>
//                                                 <option>Success</option>
//                                             </select>
//                                         </td>
//                                         <td><button className="btn btn-sm btn-primary">Chat</button></td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ContributorsSearchProjects;

                    

