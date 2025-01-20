import React from 'react';
import { BsBell, BsBoxArrowRight, BsPencilSquare, BsPersonX, BsUnlock } from 'react-icons/bs';
import { ProfileImage } from '../utils/images';
import { Ratio } from 'react-bootstrap';
import { useLogoutUserMutation } from '../rtk/endpoints/authApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import NameAvatar from './NameAvatar';

interface ProfileDropdownProps {
    name: string;
    email: string;
    role: string;
    isAvailable?: boolean;
    version?: string;
    companyName?: string;
    vatNumber?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
    name,
    email,
    role,
    isAvailable = true,
    version,
    companyName,
    vatNumber,
}) => {

    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate()
    console.log(localStorage, 'LOCALSTORAGE')
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await logoutUser({ token: token });
            localStorage.removeItem('token');
            console.log(res, 'RESONSE')
            toast.success(res.data.data)
            navigate('/login')
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="profile-dropdown">
            <div className='bg-shine'></div>

            <Ratio aspectRatio="1x1" className='image-box'>
                <img className="" src={ProfileImage} />
            </Ratio>
            <div className='wrap-dropdown'>
                <div className="profile-info">

                    <div className='d-flex gap-2 justify-content-between mb-3'>
                        <div className="status-indicator">
                            <span className={`status-dot ${isAvailable ? 'available' : ''}`} />
                            <span className="status-text">
                                {isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                        </div>
                        <button className="edit-button">
                            <BsPencilSquare />
                        </button>
                    </div>


                    <h3 className="name">{name}</h3>
                    <p className="email">{email}</p>
                    <p className="role">{role}</p>
                </div>

                <div className="action-buttons">
                    <button className="action-button">
                        <BsBell />
                    </button>
                    <button className="action-button">
                        <Link to="">
                            <BsUnlock />
                        </Link>
                    </button>
                    <button className="action-button" onClick={handleLogout}>
                        <BsBoxArrowRight />
                    </button>
                    {/* <button className="action-button">
                        <BsPersonX />
                    </button> */}
                </div>

                <div className="profile-footer">
                    <p className="version">{version}</p>
                    <p className="company">{companyName}</p>
                    <p className="vat">VAT: {vatNumber}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileDropdown;
