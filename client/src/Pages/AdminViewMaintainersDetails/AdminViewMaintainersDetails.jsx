import React, { useEffect, useState } from 'react'
import "../AdminViewContributorDetails/AdminViewContributorDetails.css"
import axios from 'axios'
import { useParams } from 'react-router-dom';



function AdminViewMaintainersDetails() {

  const [maintainer, setMaintainer] = useState(null)

  const { id } = useParams();

  useEffect(() => {
    const fetchMaintainer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/maintainers/${id}`)
        console.log(response.data)
        setMaintainer(response.data)
      }
      catch (e) {
        console.log(e)
      }

    }
          fetchMaintainer()
  }, [id])

  if (!maintainer) return <div>Loading...</div>;


  return (
    <div>
      <div className="row d-flex justify-content-center mt-3">
        <div className="col-sm-5">
          <div className="row">
            <div className="col-sm-6">
              <p>Maintainer ID</p>
              <p>{maintainer._id}</p>
            </div>
          </div>
          <div className="row">
            <div className="card p-0">
              <div className="card-header bg-white">Performance</div>
              <div className="card-body">GOOD 821</div>
            </div>
            <button className='btn btn-danger mt-5'>Delete</button>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="col-sm-12">
            <div className="card p-5">
              <label>Maintainer ID</label>
              <input type='text' className='form-control mb-2' value={maintainer._id} />
              <label>Name</label>
              <input type='text' className='form-control mb-2'  value={`${maintainer.firstName} ${maintainer.lastName}`}/>
              <label>Email</label>
              <input type='email' className='form-control mb-2' value={maintainer.email} />
              <label>Role</label>
              <input type='text' className='form-control mb-2' value={maintainer.role}/>
              <label>Github Profile</label>
                  <input type='text' className='form-control mb-2' value={maintainer.github || 'NA'} readOnly />
              <label>Skills</label>
              <input type='text' className='form-control mb-2' />
              <label>Assigned Project</label>
              <input type='text' className='form-control mb-2' />
              <label>Status</label>
              <input type='text' className='form-control mb-2' />
              <label>Registered Date</label>
              <input type='text' className='form-control mb-2' />
              <label>Last Activity</label>
              <input type='text' className='form-control mb-2' />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminViewMaintainersDetails
