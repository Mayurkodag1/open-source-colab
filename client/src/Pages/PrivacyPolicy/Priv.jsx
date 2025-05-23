import React from 'react'

function Priv() {
  return (
    <div>
          <div className="card w-75 mx-auto my-5 p-4">
      <div className="card-body">
        <h1 className="text-center mb-4">Privacy Policy</h1>

        <p>
          At Open Source Collab, your privacy is important to us. This privacy policy outlines how we collect, use, and protect your information when you use our platform.
        </p>

        <div className="mb-4">
          <h5>1. Information We Collect</h5>
          <p>We may collect the following types of personal data:</p>
          <ul>
            <li>Full name and contact information</li>
            <li>Email address and linked GitHub/GitLab accounts</li>
            <li>Usage data such as login activity, project participation, and preferences</li>
            <li>AI/ML-based data like project recommendations and search patterns</li>
          </ul>
        </div>

        <div className="mb-4">
          <h5>2. How We Use Your Data</h5>
          <p>We use your data to:</p>
          <ul>
            <li>Match contributors with relevant open-source projects</li>
            <li>Improve platform features and user experience</li>
            <li>Provide personalized recommendations using AI/ML</li>
            <li>Send updates and support-related messages</li>
          </ul>
        </div>

        <div className="mb-4">
          <h5>3. Data Sharing and Security</h5>
          <p>
            We do not sell or share your personal data with third parties without consent, except where required by law. Your data is securely stored and protected using industry-standard security protocols.
          </p>
        </div>

        <div className="mb-4">
          <h5>4. Third-Party Services</h5>
          <p>
            Our platform integrates with third-party services such as GitHub, GitLab, and Bitbucket. These services are governed by their own privacy policies. We recommend reviewing those policies before linking your accounts.
          </p>
        </div>

        <div className="mb-4">
          <h5>5. Cookies</h5>
          <p>
            We use cookies to analyze usage patterns and enhance the user experience. You can control cookie settings through your browser preferences.
          </p>
        </div>

        <div className="mb-4">
          <h5>6. Your Rights</h5>
          <p>You have the right to:</p>
          <ul>
            <li>Access and update your personal information</li>
            <li>Request deletion of your account and data</li>
            <li>Opt-out of non-essential communications</li>
          </ul>
        </div>

        <div className="mb-4">
          <h5>7. Changes to This Policy</h5>
          <p>
            We may update this policy periodically. Any changes will be posted on this page with the effective date updated accordingly.
          </p>
        </div>

        <div className="mb-4">
          <h5>8. Contact Us</h5>
          <p>
            For any questions regarding this privacy policy, please contact us at <strong>privacy@opensourcecollab.io</strong>.
          </p>
        </div>

        <p className="mt-4"><strong>Effective Date:</strong> May 20, 2025</p>
      </div>
    </div>
    </div>
  )
}

export default Priv
