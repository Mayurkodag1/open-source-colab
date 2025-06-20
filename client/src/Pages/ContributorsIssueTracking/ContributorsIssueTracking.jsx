import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../ContributorsIssueTracking/ContributorsIssueTracking.css";

function ContributorsIssueTracking() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/maintainer/issues', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setIssues(response.data);
            } catch (err) {
                // Axios error: better message
                if (err.response) {
                    setError(`Server responded with ${err.response.status}: ${err.response.data.message || err.response.statusText}`);
                } else if (err.request) {
                    setError("No response received from server.");
                } else {
                    setError("Error: " + err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    if (loading) return <p>Loading issues...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='d-flex flex-column align-items-center'>
            {issues.map((issue) => (
                <div className="card contributor-issue-card-size mb-5" key={issue._id}>
                    <p className='contributors-issue-head'>Issue ID</p>
                    <input type='text' className='form-control mb-3' value={issue._id} readOnly />

                    <p className='contributors-issue-head'>Title</p>
                    <input type='text' className='form-control mb-3' value={issue.title} readOnly />

                    <p className='contributors-issue-head'>Description</p>
                    <textarea className='form-control mb-3' rows={5} value={issue.description} readOnly />

                    <div className='d-flex'>
                        <p className='contributors-issue-head me-3'>Status</p>
                        <select className='form-control contributors-issue-status mb-3' value={issue.status} disabled>
                            <option>Pending</option>
                            <option>Success</option>
                            <option>Open</option>
                            <option>Closed</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContributorsIssueTracking;




// import React from 'react'
// import "../ContributorsIssueTracking/ContributorsIssueTracking.css"

// function ContributorsIssueTracking() {
//     return (
//         <div className='d-flex justify-content-center'>
//             <div className="card contributor-issue-card-size mb-5">
//                 <p className='contributors-issue-head'>Issue ID</p>
//                 <input type='text' className='form-control mb-3'></input>
//                 <p className='contributors-issue-head'>Title</p>
//                 <input type='text' className='form-control mb-3'></input>
//                 <p className='contributors-issue-head'>Description</p>
//               <textarea className='form-control mb-3' rows={5}></textarea>
               
                
//                 <div className='d-flex'>
//                     <p className='contributors-issue-head me-3'>status</p>
//                     <select className='form-control contributors-issue-status mb-3'>
//                         <option>Pending</option>
//                         <option>Success</option>
                     
//                     </select>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ContributorsIssueTracking
