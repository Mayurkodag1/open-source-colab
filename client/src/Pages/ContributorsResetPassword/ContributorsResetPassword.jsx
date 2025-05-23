import React from 'react';
import { useParams } from 'react-router-dom';
import forgotimg from "../../assets/Images/forgotimg.png";
import "../ContributorsResetPassword/ContributorsResetPassword.css";

function ContributorsResetPassword() {
  const { token } = useParams();

  const handleSubmit = async () => {
  const password = document.querySelector('#newPassword').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/auth/resetpassword/${token}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password }),
});


    if (!response.ok) {
      // Optional: Try to parse error message if it exists
      let errorMessage = "Password reset failed.";
      try {
        const errorData = await response.json();
        errorMessage = errorData?.message || errorMessage;
      } catch (e) {
   console.log(e)
      }
      alert(errorMessage);
      return;
    }

let successMessage = "Password reset successful!";
try {
  const data = await response.json();
  if (data?.message) successMessage = data.message;
} catch (e) {
  console.log(e)
}
alert(successMessage);


  } catch (error) {
    console.error("Error resetting password:", error);
    alert("Something went wrong.");
  }
};


  return (
    <div className='contributor-reset-pass-container'>
      <div className="left">
        <img src={forgotimg} alt="Reset" />
      </div>
      <div className="right">
        <div className="card p-5">
          <p className='text-center contributor-reset-password-head'>Reset Password</p>
          <input id="newPassword" type='password' className='form-control mb-3' placeholder='Enter new Password' />
          <input id="confirmPassword" type='password' className='form-control mb-3' placeholder='Confirm new Password' />
          <button onClick={handleSubmit} className='btn contributor-reset-password'>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ContributorsResetPassword;
