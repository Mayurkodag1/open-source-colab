import React from 'react'
import "../ContributorsLogin/ContributorsLogin.css"
import { Link } from 'react-router-dom'


function ContributorsLogin() {
  return (
<div className='contributors-log-container container'>
      <div className="contributors-log-left">
        <div className="mt-4 text-white contributors-log-page-jumbo">
          <h1>Collaborate on Open Source</h1>
          <p>Connect with contributors, maintainers, and mentors in a seamless and interactive environment. Find the perfect project for your skills.</p>
        </div>
      </div>
      <div className="contributors-log-right">
        <div className='contributors-log-right-form-data'>
          <form>
            <p className='contributors-log-right-head'>Contributors Login</p>
            <input className='form-control mb-3' type='email' placeholder='Email' />
            <input className='form-control mb-3' type='password' placeholder='Password' />
            <button className='btn btn-warning' type='submit'>Login</button>
            <p>Don&apos;t have an account? <Link className='contributors-log-right-link' to="/contributors-registration">Register</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContributorsLogin
