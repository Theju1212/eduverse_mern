import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>

      <div className="profile-box">
        <div className="profile-left">
          <img
            src="https://via.placeholder.com/150"
            alt="User"
            className="profile-img"
          />
        </div>

        <div className="profile-right">
          <form className="profile-form">
            <label>Name</label>
            <input type="text" placeholder="Tejaswini Velvaluri" disabled />

            <label>Email</label>
            <input type="email" placeholder="tejaswini@email.com" disabled />

            <label>Role</label>
            <input type="text" placeholder="Student" disabled />

            <label>Location</label>
            <input type="text" placeholder="India" disabled />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
