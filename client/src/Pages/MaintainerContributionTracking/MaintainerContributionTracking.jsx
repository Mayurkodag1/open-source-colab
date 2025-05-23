import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../MaintainerContributionTracking/MaintainerContributionTracking.css"

function MaintainerContributionTracking() {

    const [contributions, setContributions] = useState([]);
    const [number,setNumber]=useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get("http://localhost:3000/api/contributions/counts", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setNumber(response.data)
            } catch (err) {
                console.log("error", err);
            }
        };
        fetchData();
    }, []);


      useEffect(() => {
        const fetchContributions = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:3000/api/contributions", {

              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log("API table Response:", response.data); 
            setContributions(response.data.contributionEvents);
          } catch (err) {
            console.error("Error fetching contributions:", err);
          }
        };

        fetchContributions();
      }, []);


    return (
        <div>

            <div className="maintainer-contribution-tracking-session-one">


                <div className="card maintainer-contribution-tracking-session-one-card w-25 ">
                    <div className="card-header bg-white border-0 text-center">Contributors</div>
                    <div className="card-body text-center">{number.totalContributions}</div>
                </div>


                <div className="card w-25 maintainer-contribution-tracking-session-one-card">
                    <div className="card-header bg-white border-0 text-center">Projects</div>
                    <div className="card-body text-center">{number.projectContributions}</div>
                </div>

            </div>

            <div className="maintainer-contribution-tracking-session-two container">
                <table className='table table-bordered maintainer-contribution-tracking-session-two-table'>
                    <tr className='maintainer-contribution-tracking-session-two-table-head'>
                        <th>Project Title</th>
                        <th>Contribution ID</th>
                        <th>Project ID</th>
                        <th>Commit Count</th>
                        <th>Latest Commit date</th>
                        <th>Contribution Status</th>
                    </tr>
                    <tbody>
                        {contributions.length > 0 ? (
                            contributions.map((contribution, index) => (
                                <tr key={index} className='maintainer-contribution-tracking-session-two-table-body'>
                                    <td>{contribution.project.title}</td>
                                    <td>{contribution._id}</td>
                                    <td>{contribution.project._id}</td>
                                    <td>{contribution.eventType === "maintainer_issue_created" ? "1" : "N/A"}</td> {/* Placeholder for Commit Count */}
                                    <td>{new Date(contribution.timestamp).toLocaleString()}</td>
                                    <td>{contribution.project.status}</td> {/* Using project status for Contribution Status */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No contributions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default MaintainerContributionTracking
