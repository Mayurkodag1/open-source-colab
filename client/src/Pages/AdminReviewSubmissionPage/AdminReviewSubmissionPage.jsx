import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../AdminReviewSubmissionPage/AdminReviewSubmissionPage.css";

function AdminReviewSubmissionPage() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
     const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/admin/projects/${id}`)
            .then(response => {
                setProject(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error("Error fetching project details:", error);
            });
    }, [id]);
    const handleApprove = () => {
        axios.put(`http://localhost:3000/api/admin/projects/${id}/approve`)
            .then(response => {
                setModalMessage(response.data.message || "Project approved");
                setShowModal(true);
            })
            .catch(error => {
                setModalMessage("Failed to approve project.",error);
                setShowModal(true);
            });
    };
    const handleReject = () => {
    axios.put(`http://localhost:3000/api/admin/projects/${id}/reject`)
        .then(response => {
            setModalMessage(response.data.message || "Project rejected");
            setShowModal(true);
        })
        .catch(error => {
            setModalMessage("Failed to reject project.",error);
            setShowModal(true);
        });
};


    if (!project) return <p>Loading...</p>;

    return (
        <div className='p-5'>
            <div className="card p-5">
                <label>Project ID</label>
                <input type='text' className='form-control mb-3 w-50' value={project._id} readOnly />
                <label>Title</label>
                <input type='text' className='form-control mb-3 w-50' value={project.title} readOnly />
                <label>Description</label>
                <textarea className='form-control mb-3' rows={5} value={project.description} readOnly></textarea>
                {/* <label>Submitted By</label>
                <input type='text' className='form-control mb-3 w-50' value={project._id|| "N/A"} readOnly /> */}
                <label>Submitted Date</label>
                <input type='text' className='form-control mb-3 w-50' value={new Date(project.createdAt).toLocaleDateString()} readOnly />
                {/* <label>Category</label>
                <input type='text' className='form-control mb-3 w-50' value={"N/A"} readOnly /> */}
                <label>Approval</label>
                <input type='text' className='form-control mb-3' value={project.approval|| "None"} readOnly />
                <label>Maintainer Assigned</label>
               <input
    type='text'
    className='form-control mb-3 w-50'
    value={project.maintainer?.email || "Unassigned"}
    readOnly
/>


                <label>Status</label>
                <input type='text' className='form-control mb-3 w-50' value={project.status} readOnly />
            </div>
            <div className='d-flex justify-content-center mt-5'>
                 <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-warning me-3' onClick={handleApprove}>Approve</button>
  <button className='btn btn-secondary' onClick={handleReject}>Reject</button>
            </div>
               
            </div>

            <div className='w-50'>
                <label>Remark</label><br />
                <textarea placeholder='Write your Remark' className='form-control mt-4' rows={5}></textarea>
            </div>
             {showModal && (
                <div className="modal show fade d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Approval Status</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminReviewSubmissionPage;





// import React from 'react'
// import "../AdminReviewSubmissionPage/AdminReviewSubmissionPage.css"

// function AdminReviewSubmissionPage() {
//     return (
//         <div className='p-5'>
//             <div className="card p-5">
//                 <label>Project ID</label>
//                 <input type='text' className='form-control mb-3 w-50' />
//                 <label>Title</label>
//                 <input type='text' className='form-control mb-3 w-50' />
//                 <label>Description</label>
//                 <textarea className='form-control mb-3' rows={5}></textarea>
//                 <label>Submitted By</label>
//                 <input type='text' className='form-control mb-3 w-50' />
//                 <label>Submitted Date</label>
//                 <input type='text' className='form-control mb-3 w-50' />
//                 <label>Category</label>
//                 <input type='text' className='form-control mb-3 w-50' />
//                 <label>Tags</label>
//                 <input type='text' className='form-control mb-3' />
//                 <label>Maintainer Assigned</label>
//                 <input type='text' className='form-control mb-3 w-50' />
//                 <label>Status</label>
//                 <input type='text' className='form-control mb-3 w-50' />
//             </div>
//             <div className='d-flex justify-content-center mt-5'>
//                 <button className='btn btn-warning me-3'>Approve</button>
//                 <button className='btn btn-secondary'>Reject</button>
//             </div>

//             <div className='w-50'>
//                 <label>Remark</label><br></br>
//                 <textarea placeholder='Write your Remark' className='form-control mt-4' rows={5}></textarea>
//             </div>
//         </div>
//     )
// }

// export default AdminReviewSubmissionPage
