import React from 'react';

function ProfileMenu() {
  return (
    <div className="profile-menu">
      <button>
        <i className="fas fa-user-circle"></i>
      </button>
      <div className="dropdown-content">
        <a href="#value">Settings</a>
        <a href="#value">Logout</a>
      </div>
    </div>  
  );
}

export default ProfileMenu;
