import React from 'react'
import forgotimg from "../../assets/Images/forgotimg.png"
import "../ContributorsResetPassword/ContributorsResetPassword.css"

function ContributorsResetPassword() {
  return (
    <div className='contributor-reset-pass-container'>
      <div className="left">
       <img src={forgotimg}/>
      </div>
      <div className="right">
         <div className="card p-5">
            <p className='text-center contributor-reset-password-head'>Reset Password</p>
            <input type='text' className='form-control mb-3' placeholder='Enter new Password'></input>
            <input type='text' className='form-control mb-3' placeholder='Confirm new Password'></input>
            <button type='submit' className='btn contributor-reset-password'>submit</button>
         </div>
      </div>
    </div>
  )
}

export default ContributorsResetPassword
