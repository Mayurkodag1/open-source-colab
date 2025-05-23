import React from 'react';

function Contact() {
  return (
    <div className="card w-75 mx-auto my-5 p-4">
      <div className="card-body">
        <h1 className="text-center mb-4">Contact Us</h1>

        <p className="text-center mb-5">
          Have questions or feedback? Reach out to our team below.
        </p>

        <div className="row">
          {/* Contact Card 1 */}
          <div className="col-md-6 mb-4">
            <div className="border rounded p-3 h-100">
              <h5>Jane Doe</h5>
              <p><strong>Role:</strong> Community Manager</p>
              <p><strong>Email:</strong> jane.doe@opensourcecollab.io</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Location:</strong> San Francisco, CA</p>
            </div>
          </div>

          {/* Contact Card 2 */}
          <div className="col-md-6 mb-4">
            <div className="border rounded p-3 h-100">
              <h5>John Smith</h5>
              <p><strong>Role:</strong> Technical Support Lead</p>
              <p><strong>Email:</strong> john.smith@opensourcecollab.io</p>
              <p><strong>Phone:</strong> +1 (555) 987-6543</p>
              <p><strong>Location:</strong> Austin, TX</p>
            </div>
          </div>

          {/* Contact Card 3 */}
          <div className="col-md-6 mb-4">
            <div className="border rounded p-3 h-100">
              <h5>Priya Kapoor</h5>
              <p><strong>Role:</strong> Developer Relations</p>
              <p><strong>Email:</strong> priya.kapoor@opensourcecollab.io</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Location:</strong> Bangalore, India</p>
            </div>
          </div>

          {/* Contact Card 4 */}
          <div className="col-md-6 mb-4">
            <div className="border rounded p-3 h-100">
              <h5>Liam Chen</h5>
              <p><strong>Role:</strong> Platform Administrator</p>
              <p><strong>Email:</strong> liam.chen@opensourcecollab.io</p>
              <p><strong>Phone:</strong> +44 7700 900123</p>
              <p><strong>Location:</strong> London, UK</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p>For general inquiries, email us at: <strong>support@opensourcecollab.io</strong></p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
