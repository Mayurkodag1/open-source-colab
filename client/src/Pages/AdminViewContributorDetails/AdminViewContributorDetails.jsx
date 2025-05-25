import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../AdminViewContributorDetails/AdminViewContributorDetails.css";


function AdminViewContributorDetails() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [contributor, setContributor] = useState(null);
const [lastActivityDate, setLastActivityDate] = useState('');
  useEffect(() => {
  const date = new Date();
  const formatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  setLastActivityDate(formatted);
}, []);


  useEffect(() => {

    const fetchContributor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/contributors/${id}`);
        setContributor(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching contributor:", error);
      }
    };

    fetchContributor();
  }, [id]);

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this contributor ?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/admin/contributors/${id}`)
        console.log(response)
        navigate("/admin-view-contributors")


      }
      catch (err) {
        console.log("Error while Deleting Contributor", err)
        alert("Failed to delete contributor.");
      }
    }

  }

  if (!contributor) {
    return <div className="text-center mt-5">Loading contributor details...</div>;
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center mt-3">
        <div className="col-sm-5">
          <div className="row">
            <div className="col-sm-6">
              <p>Contributor ID</p>
              <p>{contributor._id}</p>
            </div>
          </div>
          <div className="row">
            <div className="card p-0">
              <div className="card-header bg-white">Performance</div>
              <div className="card-body">GOOD 821</div>
            </div>
            <button className='btn btn-danger mt-5' onClick={handleDelete}>Delete</button>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="col-sm-12">
            <div className="card p-5">
              <label>Contribution ID</label>
              <input type='text' className='form-control mb-2' value={contributor._id} readOnly />
              <label>Name</label>
              <input type='text' className='form-control mb-2' value={`${contributor.firstName} ${contributor.lastName}`} readOnly />
              <label>Role</label>
              <input type='text' className='form-control mb-2' value={contributor.role || ''} readOnly />
              <label>Github Profile</label>
              <input type='text' className='form-control mb-2' value={contributor.portfolio.github || 'NA'} readOnly />
              <label>Skills</label>
              <input type='text' className='form-control mb-2' value={contributor.portfolio.skills || ''} readOnly />
              <label>Status</label>
              <input type='text' className='form-control mb-2' value={contributor.status || 'Active'} readOnly />
              <label>Registered Date</label>
              <input type='text' className='form-control mb-2' value={new Date(contributor.date).toLocaleDateString()} readOnly />
              <label>Last Activity</label>
              <input type='text' className='form-control mb-2'   value={lastActivityDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewContributorDetails;


// import React from 'react'

// import "../AdminViewContributorDetails/AdminViewContributorDetails.css"

// function AdminViewContributorDetails() {
//   return (
//     <div>
//       <div className="row d-flex justify-content-center mt-3">
//         <div className="col-sm-5">
//           <div className="row">
//             <div className="col-sm-6">
//               <p>Contributor ID</p>
//               <p>xxxxx12334</p>
//             </div>
//           </div>
//           <div className="row">
//             <div className="card p-0">
//               <div className="card-header bg-white">Performance</div>
//               <div className="card-body">GOOD 821</div>
//             </div>
//             <button className='btn btn-danger mt-5'>Delete</button>
//           </div>
//         </div>
//         <div className="col-sm-5">
//           <div className="col-sm-12">
//             <div className="card p-5">
//               <label>Contribution ID</label>
//               <input type='text' className='form-control mb-2' />
//               <label>Name</label>
//               <input type='text' className='form-control mb-2' />
//               <label>Contact Number</label>
//               <input type='text' className='form-control mb-2' />
//               <label>Github Profile</label>
//               <input type='text' className='form-control mb-2' />
//               <label>Skills</label>
//               <input type='text' className='form-control mb-2' />
//               <label>Status</label>
//               <input type='text' className='form-control mb-2' />
//               <label>Registered Date</label>
//               <input type='text' className='form-control mb-2' />
//               <label>Last Activity</label>
//               <input type='text' className='form-control mb-2' />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminViewContributorDetails
