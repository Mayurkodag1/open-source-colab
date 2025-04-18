import React from 'react'
import "../ContributorsActivity/ContributorsActivity.css"

function ContributorsActivity() {
    return (
        <div>

            <div className="card container">
                <p className='contributors-activity-head'>Contribution ID</p>
                <input type='text' className='form-control mb-3'></input>
                <p className='contributors-activity-head'>Project ID</p>
                <input type='text' className='form-control mb-3'></input>
                <div className='d-flex'>
                    <p className='contributors-activity-head me-3'>Commit Count</p>
                    <input type='text' className='form-control contributors-activity-commit-count mb-3'></input>
                </div>
                <p className='contributors-activity-head'>Latest Updates</p>
                <input type='text' className='form-control mb-3'></input>
                <div className='d-flex'>
                    <p className='contributors-activity-head me-3'>status</p>
                    <select className='form-control contributors-activity-status mb-3'>
                        <option>Pending</option>
                        <option>Success</option>
                       
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ContributorsActivity
