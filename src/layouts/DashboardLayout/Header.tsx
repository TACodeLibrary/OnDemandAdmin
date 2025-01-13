
import { Dropdown, Ratio } from "react-bootstrap";
import GlobalSearchbar from "../../components/GlobalSearchbar";
import { AddTask, Groups, Message, Notification, ProfileImage, StickyNotes } from "../../utils/images";
import { BsChevronDown } from "react-icons/bs";
import ProfileDropdown from "../../components/ProfileDropdown";
import { RootState } from "../../rtk/store";
import { useSelector } from "react-redux";

const Header = () => {
    const auth = useSelector((state: RootState) => state.auth);
    console.log(auth, 'AUTH')
    return (
        <header className="header">
            <div className="left-header">
                <button className="btn btn-transparent header-icons">
                    <img src={StickyNotes} />
                </button>
                <button className="btn btn-transparent header-icons">
                    <img src={Groups} />
                </button>
                <button className="btn btn-transparent header-icons">
                    <img src={AddTask} />
                </button>
            </div>

            <GlobalSearchbar
                onSearch={(term) => console.log('Searching for:', term)}
                placeholder="Search anything..."
            />

            <div className="right-header">
                <button className="btn btn-transparent header-icons">
                    <img src={Message} />
                </button>
                <button className="btn btn-transparent header-icons">
                    <img src={Notification} />
                </button>
            </div>

            <Dropdown className="profile-drop">
                <Dropdown.Toggle id="dropdown-basic" as="div" className="profile-view d-flex align-items-center cursor-pointer">

                    <Ratio aspectRatio="1x1" className="img-circle">
                        <img className="" src={ProfileImage} />
                    </Ratio>
                    <div className="profile-description">
                        <h4>Olivia Rhye</h4>
                        <p>User Support</p>
                    </div>
                    <BsChevronDown className="ms-auto" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-card">
                    <ProfileDropdown
                        name="Olivia Rhye"
                        email="rhyeol@onairsa.com"
                        role="User Support"
                        isAvailable={true}
                        version="v3.586.1"
                        companyName="OnAir L.L.C"
                        vatNumber="327842973972979237473B"
                    />
                </Dropdown.Menu>
            </Dropdown>

        </header>
    );
};

export default Header; 