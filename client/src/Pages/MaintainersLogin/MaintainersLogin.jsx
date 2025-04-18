import React from 'react'
import { Link } from 'react-router-dom'
import "../MaintainersLogin/MaintainersLogin.css"

function MaintainersLogin() {
  return (
    <div className='maintainers-log-container container'>
      <div className="maintainers-log-left">
        <div class="mt-4 text-white maintainers-log-page-jumbo">
          <h1>Collaborate on Open Source</h1>
          <p>Connect with contributors, maintainers, and mentors in a seamless and interactive environment. Find the perfect project for your skills.</p>
        </div>
      </div>

      <div className="maintainers-log-right">

                <div className='maintainers-log-right-form-data'>
                    <form>
                        <p className='maintainers-log-right-head'>Maintainers Login</p>
                        <input className='form-control mb-3' type='email' placeholder='Email'></input>
                        <input className='form-control mb-3' type='assword' placeholder='Password'></input>
                        <button className='btn btn-warning' type='submit'>Login</button>
                         <div className='mt-3'> <Link className='maintainers-log-right-link ' >Forget Password ?</Link></div>
                        <p className='mt-3'>Dont&apos;t have an account?<Link className='maintainers-log-right-link' to="/maintainers-registration">Register</Link></p>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default MaintainersLogin
