import React from 'react';
import { Badge, Form, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { FiEdit3, FiEye, FiFlag } from 'react-icons/fi';
import { BiBlock, BiTrash } from 'react-icons/bi';
import { TbTrash } from 'react-icons/tb';
import { BsFillFlagFill, BsFlag, BsSearch } from 'react-icons/bs';
import { Card } from 'react-bootstrap';
import CustomersListsCards from '../../../components/users/customers/CustomersList';
import NameAvatar from '../../../components/NameAvatar';
import { ProfileImage } from '../../../utils/images';

const CustomersList: React.FC = () => {
    return (
        <DashboardLayout>
            <Card className="dark">
                <Card.Body>
                    <div className='page-header mb-4'>
                        <div className='page-geader-title'>
                            <h1 className="title-h1 mb-1">Users</h1>
                            <p>Customers</p>
                        </div>
                        <div className='page-header-rightbar'>

                            <div className='icons-list'>
                                <button className='btn btn-transparent'><FiEye /></button>
                                <button className='btn btn-transparent'><FiEdit3 /></button>
                                <button className='btn btn-transparent'><FiFlag /></button>
                                <button className='btn btn-transparent'><BiBlock /></button>
                                <button className='btn btn-transparent bg-danger'><TbTrash /></button>
                            </div>
                            <form className="search-form">
                                <div className="search-container">
                                    <button type="submit" className="search-button">
                                        <BsSearch />
                                    </button>
                                    <input
                                        type="search"
                                        // onChange={handleChange}
                                        placeholder='Search...'
                                        className="form-control search-input"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='body-cards'>
                        <CustomersListsCards />
                        <div className='user-customer-table table-responsive'>
                            <Table striped hover className='theme-table-view'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>Picture</th>
                                        <th>Full Name</th>
                                        <th>Mobile Number</th>
                                        <th>Gender</th>
                                        <th>City</th>
                                        <th>Date of Registration</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className='text-center'>
                                            <Form.Check
                                                type="checkbox"
                                                id="check"
                                            />
                                        </th>
                                        <th>34275789</th>
                                        <th>
                                            <NameAvatar src={ProfileImage} alt='name' />
                                        </th>
                                        <th>Sheena Bajaj</th>
                                        <th>+966 4567345</th>
                                        <th>Male</th>
                                        <th>Vegas</th>
                                        <th>29/02/2024</th>
                                        <th>
                                            <Badge bg='success'>Active</Badge>
                                        </th>
                                        <th>
                                            <div className='button-group'>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>View Details</Tooltip>}
                                                >
                                                    <button className='btn btn-transparent'><FiEye /></button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Edit User</Tooltip>}
                                                >
                                                    <button className='btn btn-transparent'><FiEdit3 /></button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Flag User</Tooltip>}
                                                >
                                                    <button className='btn btn-transparent'><BsFlag /></button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Block User</Tooltip>}
                                                >
                                                    <button className='btn btn-transparent'><BiBlock /></button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Delete User</Tooltip>}
                                                >
                                                    <button className='btn btn-transparent'><BiTrash /></button>
                                                </OverlayTrigger>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className='text-center'>
                                            <Form.Check
                                                type="checkbox"
                                                id="check"
                                            />
                                        </th>
                                        <th>34275789</th>
                                        <th>
                                            <NameAvatar src={ProfileImage} alt='name' />
                                        </th>
                                        <th>Sheena Bajaj</th>
                                        <th>+966 4567345</th>
                                        <th>Male</th>
                                        <th>Vegas</th>
                                        <th>29/02/2024</th>
                                        <th>
                                            <Badge bg='danger'>InActive</Badge>
                                        </th>
                                        <th>
                                            <div className='button-group'>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>View Details</Tooltip>}
                                                >
                                                    <button className='btn btn-transparent'><FiEye /></button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Edit User</Tooltip>}
                                                >
                                                    <button className='btn btn-transparent'><FiEdit3 /></button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Flag User</Tooltip>}
                                                >
                                                    <button className='btn btn-transparent danger'><BsFillFlagFill /></button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Block User</Tooltip>}
                                                >
                                                    <button className='btn btn-transparent'><BiBlock /></button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Delete User</Tooltip>}
                                                >
                                                    <button className='btn btn-transparent'><BiTrash /></button>
                                                </OverlayTrigger>
                                            </div>
                                        </th>
                                    </tr>

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
