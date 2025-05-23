<<<<<<< HEAD
import React from 'react'

function TermsOfConditions() {
  return (
    <div>
      <h1>Terms</h1>
    </div>
  )
}

export default TermsOfConditions
=======

import "../TermsOfConditions/TermsOfConditions.css"

import React from 'react';

function TermsOfConditions() {
  return (
    <div className='card w-75 mx-auto my-5 p-4'>
      <div className="card-body">
        <div className="terms-container">
          <h1 className="text-center mb-4">Terms and Conditions</h1>

          <p>Welcome to Open Source Collab. By accessing or using our platform, you agree to be bound by the following terms and conditions. Please read them carefully before using the service.</p>

          <div className="mb-4">
            <h5>1. Acceptance of Terms</h5>
            <p>By registering on or using Open Source Collab, you agree to comply with these terms and any future updates. If you do not agree, please do not use the platform.</p>
          </div>

          <div className="mb-4">
            <h5>2. User Roles & Responsibilities</h5>
            <ul>
              <li><strong>Contributors:</strong> Must provide accurate profile information and follow project contribution guidelines.</li>
              <li><strong>Maintainers:</strong> Are responsible for managing their listed projects and maintaining a respectful environment.</li>
              <li><strong>Mentors:</strong> (Optional) Should provide honest, constructive feedback and guidance.</li>
              <li><strong>Admins:</strong> Oversee overall platform activity and ensure policy compliance.</li>
            </ul>
          </div>

          <div className="mb-4">
            <h5>3. Community Guidelines</h5>
            <p>All users must interact respectfully, avoid harassment, and follow open-source contribution standards. Abusive language or behavior will result in suspension or removal.</p>
          </div>

          <div className="mb-4">
            <h5>4. Project & Content Ownership</h5>
            <p>Maintainers retain ownership of their projects. Contributors agree that their contributions may be used under the open-source license of the respective project.</p>
          </div>

          <div className="mb-4">
            <h5>5. AI Recommendations</h5>
            <p>The platform uses AI/ML to suggest projects. While we strive for accuracy, we are not responsible for mismatched recommendations or outcomes from joining a suggested project.</p>
          </div>

          <div className="mb-4">
            <h5>6. Account Security</h5>
            <p>Users are responsible for maintaining the confidentiality of their login credentials and account information. Integration with GitHub/GitLab/Bitbucket should follow secure authentication practices.</p>
          </div>

          <div className="mb-4">
            <h5>7. Termination</h5>
            <p>We reserve the right to suspend or terminate accounts for violations of these terms, misuse of the platform, or harmful conduct toward others.</p>
          </div>

          <div className="mb-4">
            <h5>8. Changes to Terms</h5>
            <p>These terms may be updated periodically. Continued use of the platform after changes are posted implies acceptance of the revised terms.</p>
          </div>

          <div className="mb-4">
            <h5>9. Contact</h5>
            <p>If you have any questions about these terms, please reach out to us through the platform’s contact or support page.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TermsOfConditions;

>>>>>>> new
