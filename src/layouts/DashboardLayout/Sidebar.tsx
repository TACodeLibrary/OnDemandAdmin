// import './Sidebar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dashboard, Profile } from '../../utils/images';
import { BsChevronRight, BsChevronDown } from "react-icons/bs";

const Sidebar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isReportsMenuOpen, setIsReportsMenuOpen] = useState(false);

  return (
    <aside className="leftSidebar">
      <nav className="leftSidebar-nav">
        <Link to="/dashboard" className="nav-link">
          <img src={Dashboard} className='side-icons'/>
          <span>Dashboard</span>
        </Link>
        
        {/* User menu with submenu */}
        <div className="nav-item">
          <div 
            className="nav-link"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <img src={Profile} className='side-icons'/>
            <span>User</span>
            <span className="arrow">{isUserMenuOpen ? <BsChevronDown/> : <BsChevronRight/>}</span>
          </div>
          
          {/* Submenu items */}
          {isUserMenuOpen && (
            <div className="submenu">
              <Link to="/account" className="nav-link submenu-link">
                <img src={Profile} className='side-icons'/>
                <span>Account</span>
              </Link>
              <Link to="/contact" className="nav-link submenu-link">
                <img src={Profile} className='side-icons'/>
                <span>Contact</span>
              </Link>
            </div>
          )}
        </div>

        {/* Settings menu with submenu */}
        {/* <div className="nav-item">
          <div 
            className="nav-link"
            onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
          >
            <img src={Profile} className='side-icons'/>
            <span>Settings</span>
            <span className="arrow">{isSettingsMenuOpen ? '▼' : '▶'}</span>
          </div>
          
          {isSettingsMenuOpen && (
            <div className="submenu">
              <Link to="/general" className="nav-link submenu-link">
                <img src={Profile} className='side-icons'/>
                <span>General</span>
              </Link>
              <Link to="/security" className="nav-link submenu-link">
                <img src={Profile} className='side-icons'/>
                <span>Security</span>
              </Link>
            </div>
          )}
        </div> */}

        {/* Reports menu with submenu */}
        {/* <div className="nav-item">
          <div 
            className="nav-link"
            onClick={() => setIsReportsMenuOpen(!isReportsMenuOpen)}
          >
            <img src={Profile} className='side-icons'/>
            <span>Reports</span>
            <span className="arrow">{isReportsMenuOpen ? '▼' : '▶'}</span>
          </div>
          
          {isReportsMenuOpen && (
            <div className="submenu">
              <Link to="/analytics" className="nav-link submenu-link">
                <img src={Profile} className='side-icons'/>
                <span>Analytics</span>
              </Link>
              <Link to="/statistics" className="nav-link submenu-link">
                <img src={Profile} className='side-icons'/>
                <span>Statistics</span>
              </Link>
            </div>
          )}
        </div> */}
      </nav>
    </aside>
  );
};

export default Sidebar; 