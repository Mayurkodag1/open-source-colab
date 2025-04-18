import React from 'react'
import "../MaintainersRegistration/MaintainersRegistration.css"
import { Link } from 'react-router-dom'

function MaintainersRegistration() {
    return (
        <div className='maintainers-reg-container container'>
            <div className="maintainers-reg-left">
                <div class="mt-4 text-white maintainers-reg-page-jumbo">
                    <h1>Collaborate on Open Source</h1>
                    <p>Connect with contributors, maintainers, and mentors in a seamless and interactive environment. Find the perfect project for your skills.</p>
                    
                </div>
            </div>
            <div className="maintainers-reg-right">

                <div className='maintainers-reg-right-form-data'>
                    <form>
                        <p className='maintainers-reg-right-head'>Maintainers Registration</p>
                        <input className='form-control mb-3' type='text' placeholder='First Name'></input>
                        <input className='form-control mb-3' type='text' placeholder='Last Name'></input>
                        <input className='form-control mb-3' type='email' placeholder='Email'></input>
                        <input className='form-control mb-3' type='assword' placeholder='Password'></input>
                        <input className='form-control mb-3' type='password' placeholder='Confirm Password'></input>
                        <button className='btn btn-warning' type='submit'>Register</button>
                        <p>already have an account?<Link className='maintainers-reg-right-link' to="/maintainers-login">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MaintainersRegistration
