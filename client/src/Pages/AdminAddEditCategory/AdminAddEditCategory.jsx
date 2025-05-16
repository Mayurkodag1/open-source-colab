import React from 'react'

function AdminAddEditCategory() {
    return (
        <div className='p-5'>
            <div className="card p-5">
                <label>Category Name</label>
                <input type='text' className='form-control mb-4' />
                <label>Description</label>
                <textarea className='form-control' rows={5}></textarea>
                <div className='d-flex justify-content-end mt-5'>
                    <button className='btn btn-success me-3'>Add Category</button>
                    <button className='btn btn-danger'>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default AdminAddEditCategory
