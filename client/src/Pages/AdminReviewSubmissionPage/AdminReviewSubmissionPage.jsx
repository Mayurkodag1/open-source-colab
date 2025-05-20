import React from 'react'
import "../AdminReviewSubmissionPage/AdminReviewSubmissionPage.css"

function AdminReviewSubmissionPage() {
    return (
        <div className='p-5'>
            <div className="card p-5">
                <label>Project ID</label>
                <input type='text' className='form-control mb-3 w-50' />
                <label>Title</label>
                <input type='text' className='form-control mb-3 w-50' />
                <label>Description</label>
                <textarea className='form-control mb-3' rows={5}></textarea>
                <label>Submitted By</label>
                <input type='text' className='form-control mb-3 w-50' />
                <label>Submitted Date</label>
                <input type='text' className='form-control mb-3 w-50' />
                <label>Category</label>
                <input type='text' className='form-control mb-3 w-50' />
                <label>Tags</label>
                <input type='text' className='form-control mb-3' />
                <label>Maintainer Assigned</label>
                <input type='text' className='form-control mb-3 w-50' />
                <label>Status</label>
                <input type='text' className='form-control mb-3 w-50' />
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-warning me-3'>Approve</button>
                <button className='btn btn-secondary'>Reject</button>
            </div>

            <div className='w-50'>
                <label>Remark</label><br></br>
                <textarea placeholder='Write your Remark' className='form-control mt-4' rows={5}></textarea>
            </div>
        </div>
    )
}

export default AdminReviewSubmissionPage
