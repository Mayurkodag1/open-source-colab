import React from 'react'
import "../ContributorsRegistration/ContributorsRegistration.css"
import { Link } from 'react-router-dom'

function ContributorsRegistration() {
  return (
    <div className='contributors-reg-container container'>
    <div className="contributors-reg-left">
        <div class="mt-4 text-white contributors-reg-page-jumbo">
            <h1>Collaborate on Open Source</h1>
            <p>Connect with contributors, maintainers, and mentors in a seamless and interactive environment. Find the perfect project for your skills.</p>
        </div>
    </div>
    <div className="contributors-reg-right">

        <div className='contributors-reg-right-form-data'>
            <form>
                <p className='contributors-reg-right-head'>Contributors Registration</p>
                <input className='form-control mb-3' type='text' placeholder='First Name'></input>
                <input className='form-control mb-3' type='text' placeholder='Last Name'></input>
                <input className='form-control mb-3' type='email' placeholder='Email'></input>
                <input className='form-control mb-3' type='assword' placeholder='Password'></input>
                <input className='form-control mb-3' type='password' placeholder='Confirm Password'></input>
                <button className='btn btn-warning' type='submit'>Register</button>
                <p>already have an account?<Link className='contributors-reg-right-link' to="/contributors-login">Login</Link></p>
            </form>
        </div>
    </div>
</div>

  )
}

export default ContributorsRegistration
