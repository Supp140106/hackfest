
import { useLocation } from "react-router-dom";

const ProfileHeader = () => {
  const location = useLocation();
  
  return (
    <div className="header">
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search" />
        <div className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
      <img src="/lovable-uploads/924be514-d335-4305-87b9-6cfc2974e705.png" alt="Profile" className="profile-pic" />
    </div>
  );
};

export default ProfileHeader;
