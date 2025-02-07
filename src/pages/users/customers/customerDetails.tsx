import React, { useState } from 'react';
import { Button, Card, Tab, Tabs } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { BiChevronLeft } from 'react-icons/bi';
import CustomerHeaderProfile from '../../../components/users/CustomerHeaderProfile';
import AboutTabDetails from '../../../components/users/customerDetails/aboutTabDetails';
import { FiEdit } from 'react-icons/fi';
import AboutTabUpdateDetails from '../../../components/users/customerDetails/aboutTabUpdateDetails';

const CustomerDetails: React.FC = () => {
  const [isUpdating, setisUpdating] = useState(false);

  function editCustomerDetails() {
    console.log(isUpdating, 'isUpdating')
    setisUpdating(!isUpdating);
  }
  return (
    <DashboardLayout>
      <Card className="dark">
        <Card.Body>
          <div className="page-header mb-4">
            <div className="page-header-title has-icon">
              <button type='button' className='px-0'><BiChevronLeft /></button>
              <h1 className="title-h1 mb-0">Profile</h1>
            </div>
            <div className="page-header-rightbar">
              <div className='icons-list'>
                <Button type='button' onClick={editCustomerDetails}><FiEdit /></Button>
              </div>
              <form className="search-form">
                <div className="search-container">
                  <button type="submit" className="search-button">
                    <BsSearch />
                  </button>
                  <input
                    type="search"
                    placeholder="Search..."
                    className="form-control search-input"
                  />
                </div>
              </form>
            </div>
          </div>
          <CustomerHeaderProfile />

          <Tabs
            defaultActiveKey="about"
            id="uncontrolled-tab-example"
            className="tabs-primary"
          >
            <Tab eventKey="about" title="About">
              <div className="tab-wrap">

                {
                  isUpdating ?
                    <AboutTabUpdateDetails />
                    :
                    <AboutTabDetails />
                }

              </div>
            </Tab>

            <Tab eventKey="bookings" title="Bookings">

            </Tab>
            <Tab eventKey="payments" title="Payments">
              Tab content for Payment
            </Tab>
            <Tab eventKey="reviews" title="Ratings & Reviews">
              Tab content for Reviews
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
};

export default CustomerDetails;
