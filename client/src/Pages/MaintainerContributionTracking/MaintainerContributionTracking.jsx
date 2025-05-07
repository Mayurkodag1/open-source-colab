import React from 'react'
import "../MaintainerContributionTracking/MaintainerContributionTracking.css"

function MaintainerContributionTracking() {
    return (
        <div>

            <div className="maintainer-contribution-tracking-session-one">


                <div className="card maintainer-contribution-tracking-session-one-card w-25 ">
                    <div className="card-header bg-white border-0 text-center">Contributors</div>
                    <div className="card-body text-center">147</div>
                </div>


                <div className="card w-25 maintainer-contribution-tracking-session-one-card">
                    <div className="card-header bg-white border-0 text-center">Projects</div>
                    <div className="card-body text-center">147</div>
                </div>


                <div className="card w-25 maintainer-contribution-tracking-session-one-card">
                    <div className="card-header bg-white border-0 text-center">Income</div>
                    <div className="card-body text-center">147</div>
                </div>


            </div>

            <div className="maintainer-contribution-tracking-session-two container">
                <table className='table table-bordered maintainer-contribution-tracking-session-two-table'>
                    <tr className='maintainer-contribution-tracking-session-two-table-head'>
                        <th>Contribution ID</th>
                        <th>Project ID</th>
                        <th>Commit Count</th>
                        <th>Latest Commit date</th>
                        <th>Contribution Status</th>
                    </tr>
                    <tr className='maintainer-contribution-tracking-session-two-table-body'>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>12</td>
                        <td>xxx</td>
                        <td>Pending</td>
                    </tr>
                </table>
            </div>

        </div>
    )
}

export default MaintainerContributionTracking
