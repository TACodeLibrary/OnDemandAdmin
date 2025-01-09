// import './Sidebar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Dashboard, Dollor, Info, Notification, Offers, Profile, Settings, SidebarWrap,
   SmallLogo, Sound, Task } from '../../utils/images';
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { Button } from 'react-bootstrap';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const menu = [
    {
      icon: Dashboard,
      label: 'Dashboard',
      url: '/dashboard',
      hasChild: false
    },
    {
      icon: Profile,
      label: 'Users',
      url: '#',
      hasChild: true,
      children: [
        { label: 'Customers', url: '#' },
        { label: 'Service Providers', url: '#' },
        { label: 'Vendors', url: '#' },
        { label: 'Referrals', url: '#' },
        { label: 'Support', url: '#' }
      ]
    },
    {
      icon: Task,
      label: 'Services',
      url: '#',
      hasChild: false
    },
    {
      icon: Dollor,
      label: 'Earnings',
      url: '#',
      hasChild: false
    },
    {
      icon: Bookmark,
      label: 'Bookings',
      url: '#',
      hasChild: false
    },
    {
      icon: Offers,
      label: 'Offers & Promotions',
      url: '#',
      hasChild: false
    },
    {
      icon: Sound,
      label: 'Advertisements',
      url: '#',
      hasChild: false
    },
    {
      icon: Notification,
      label: 'Notifications',
      url: '#',
      hasChild: false
    },
    {
      icon: Info,
      label: 'CMS',
      url: '#',
      hasChild: true,
      children: [
        { label: 'Help & Support', url: '#' },
        { label: 'Legal', url: '#' },
        { label: 'About', url: '#' }
      ]
    },
    {
      icon: Settings,
      label: 'System Settings',
      url: '#',
      hasChild: false
    }
  ];

  const toggleSubmenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <aside className="leftSidebar">
      <div className='leftside-topbar'>
        <div className='logo-wrap'>
          <div className='d-flex align-items-center mb-2'>
          <img src={SmallLogo} />
          <span>OnAir</span>
          </div>
          <p className='mb-0'>Admin Panel</p>
        </div>
        <Button className='sidebar-wrap-icon btn-dummy'>
          <img src={SidebarWrap} />
        </Button>
      </div>
      <nav className="leftSidebar-nav">
        {menu.map((item, index) => (
          <div key={index} className="nav-item">
            {item.hasChild ? (
              <>
                <div
                  className="nav-link"
                  onClick={() => toggleSubmenu(item.label)}
                >
                  <img src={item.icon} className='side-icons' />
                  <span>{item.label}</span>
                  <span className="arrow">
                    {openMenus[item.label] ? <BsChevronDown /> : <BsChevronRight />}
                  </span>
                </div>
                {openMenus[item.label] && (
                  <div className="submenu">
                    {item.children?.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        to={child.url}
                        className="nav-link submenu-link"
                      >
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link to={item.url} className="nav-link">
                <img src={item.icon} className='side-icons' />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 