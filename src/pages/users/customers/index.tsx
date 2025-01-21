import React, { useState } from 'react';
import { Badge, Form, Table, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { FiEdit3, FiEye, FiFlag } from 'react-icons/fi';
import { BiBlock, BiTrash } from 'react-icons/bi';
import { TbTrash } from 'react-icons/tb';
import { BsFillFlagFill, BsFlag, BsSearch } from 'react-icons/bs';
import NameAvatar from '../../../components/NameAvatar';
import { useCustomerListQuery } from '../../../rtk/endpoints/userApi';
import Loader from '../../../utils/Loader';
import { ProfileImage } from '../../../utils/images';

const CustomersList: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { data: customerListData, isLoading, isError } = useCustomerListQuery({
    page: 1,
    page_size: 10,
    user_type: 'APP',
    list_type: 'ALL',
    search_keyword: '',
  });

  const sortByFullName = () => {
    if (!customerListData?.data) return;

    const sortedData = [...customerListData.data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.full_name.localeCompare(b.full_name);
      } else {
        return b.full_name.localeCompare(a.full_name);
      }
    });

    // Update the local state for sorted data (if needed)
    customerListData.data = sortedData;
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading customers.</p>;

  return (
    <DashboardLayout>
      <Card className="dark">
        <Card.Body>
          <div className="page-header mb-4">
            <div className="page-geader-title">
              <h1 className="title-h1 mb-1">Users</h1>
              <p>Customers</p>
            </div>
            <div className="page-header-rightbar">
              <div className="icons-list">
                <button className="btn btn-transparent"><FiEye /></button>
                <button className="btn btn-transparent"><FiEdit3 /></button>
                <button className="btn btn-transparent"><FiFlag /></button>
                <button className="btn btn-transparent"><BiBlock /></button>
                <button className="btn btn-transparent bg-danger"><TbTrash /></button>
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
          <div className="body-cards">
            <div className="user-customer-table table-responsive">
              <Table striped hover className="theme-table-view">
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Picture</th>
                    <th>
                      <span style={{ cursor: 'pointer' }} onClick={sortByFullName}>
                        Full Name {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    </th>
                    <th>Mobile Number</th>
                    <th>Gender</th>
                    <th>Date of Registration</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customerListData?.data.map((customer: any, index: any) => (
                    <tr key={index}>
                      <th className="text-center">
                        <Form.Check type="checkbox" id={`check-${customer.id}`} />
                      </th>
                      <th>{customer.id}</th>
                      <th>
                        <NameAvatar src={customer.profile_image ? customer.profile_image : ProfileImage} alt={customer.full_name} />
                      </th>
                      <th>{customer.full_name}</th>
                      <th>{customer.phone_no || 'N/A'}</th>
                      <th>{customer.gender || 'N/A'}</th>
                      <th>{new Date(customer.created_at).toLocaleDateString()}</th>
                      <th>
                        <Badge bg={customer.status === 'ACTIVE' ? 'success' : 'danger'}>
                          {customer.status}
                        </Badge>
                      </th>
                      <th>
                        <div className="button-group">
                          <OverlayTrigger placement="top" overlay={<Tooltip>View Details</Tooltip>}>
                            <button className="btn btn-transparent"><FiEye /></button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Edit User</Tooltip>}>
                            <button className="btn btn-transparent"><FiEdit3 /></button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Flag User</Tooltip>}>
                            <button className="btn btn-transparent">
                              {false ? <BsFillFlagFill /> : <BsFlag />}
                            </button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Block User</Tooltip>}>
                            <button className="btn btn-transparent"><BiBlock /></button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Delete User</Tooltip>}>
                            <button className="btn btn-transparent"><BiTrash /></button>
                          </OverlayTrigger>
                        </div>
                      </th>
                    </tr>
                  ))}
                  {customerListData?.data.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-center">No customers found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
};

export default CustomersList;
