import React from 'react'
import "../ContributorsIssueTracking/ContributorsIssueTracking.css"

function ContributorsIssueTracking() {
    return (
        <div>
            <div className="card container mb-5">
                <p className='contributors-issue-head'>Issue ID</p>
                <input type='text' className='form-control mb-3'></input>
                <p className='contributors-issue-head'>Title</p>
                <input type='text' className='form-control mb-3'></input>
                <p className='contributors-issue-head'>Description</p>
              <textarea className='form-control mb-3' rows={5}></textarea>
               
                
                <div className='d-flex'>
                    <p className='contributors-issue-head me-3'>status</p>
                    <select className='form-control contributors-issue-status mb-3'>
                        <option>Pending</option>
                        <option>Success</option>
                     
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ContributorsIssueTracking
