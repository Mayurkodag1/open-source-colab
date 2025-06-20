import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // ✅ CORRECT for Vite + jwt-decode v4+
import "../MaintainerProfile/MaintainerProfile.css";

function MaintainerProfile() {
  const [maintainer, setMaintainer] = useState(null);
  const token = localStorage.getItem("token");

  let userId = null;
  try {
    const decodedToken = jwtDecode(token); // ✅ use named function
    userId = decodedToken.id || decodedToken._id || decodedToken.userId;
    console.log(userId)
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  const api = userId ? `http://localhost:3000/api/admin/maintainers/${userId}` : null;

  useEffect(() => {
    const fetchMaintainerData = async () => {
      if (!api || !token) return;

      try {
        const response = await axios.get(api, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMaintainer(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching maintainer profile:", err);
      }
    };

    fetchMaintainerData();
  }, [api, token]);

  if (!maintainer) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <div className="profile-page container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center" style={{ color: '#F18c00' }}>Profile</h3>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Name:</label>
            <p>{maintainer.name}</p>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Email:</label>
            <p>{maintainer.email}</p>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Role:</label>
            <p>Maintainer</p>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Bio:</label>
            <p>{maintainer.bio || "No bio available"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintainerProfile;
