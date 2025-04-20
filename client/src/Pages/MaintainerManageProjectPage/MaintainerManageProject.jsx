import React from 'react'
import "../MaintainerManageProjectPage/MaintainerManageProject.css"
import imgone from "../../assets/Images/mainatinermanage.svg"


function MaintainerManageProject() {
  return (
    <div>

      <div className='d-flex justify-content-center mt-5'>
        <div className="maintainer-manage-proj-sec-one">
          <div className='mt-5'>
            <p className='maintainer-manage-proj-sec-one-para'>Overview</p>
            <p className='maintainer-manage-proj-sec-one-paraone'>An overview of all the project in the past 3 weeks</p>
          </div>
          <div className='mt-4'>
            <img src={imgone} />
          </div>
        </div>
      </div>

      <div className="maintainer-manage-proj-sec-two">
        
      </div>



    </div>
  )
}

export default MaintainerManageProject
