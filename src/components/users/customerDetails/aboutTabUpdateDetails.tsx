import { useState } from "react";
import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import DatePicker from "react-datepicker";
import { FiEdit, FiTrash } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";


const AboutTabUpdateDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]
  return (
    <>
      <Card className='darker'>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="First Name"
                className="mb-3 field-transparent"
              >
                <Form.Control
                  type="text"
                  placeholder="First Name"
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
                className="mb-3 field-transparent"
              >
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                />
              </FloatingLabel>
            </Col>
            <Col md={12}>
              <div className="phone-input-field mb-3">
                <PhoneInput
                  country={"us"} // Default country
                  enableSearch={true} // Allow country search
                  placeholder="Enter phone number"
                  inputClass="form-control" // Bootstrap styling
                />
              </div>
            </Col>
            <Col md={12}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email Address"
                className="mb-3 field-transparent"
              >
                <Form.Control
                  type="text"
                  placeholder="Email Address"
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <div className="react-select-field">
                <Select options={genderOptions} placeholder="Select Gender" className="form-control" classNamePrefix="custom-select" />
              </div>
            </Col>
            <Col md={6}>
              <DatePicker className="form-control" selected={startDate} onChange={(date: any) => setStartDate(date)} dateFormat="dd/MM/yyyy" placeholderText="Date of Birth" />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="small-linear-card">
                <label className="primary">Address</label>
                <div className="home-address">
                  <Form.Group>
                    <label>Home</label>
                    <div className="d-flex align-items-center">
                      <p>
                        <span>3891 Ranchview Dr. Richardson </span><br />
                        <span>California 62639</span>
                      </p>
                      <div className="icons-list ms-auto">
                        <button className="btn p-1"><FiEdit /></button>
                        <button className="btn p-1"><FiTrash /></button>

                      </div>
                    </div>
                    {/* <input type="text" placeholder="Street Address" className="form-control" /> */}
                  </Form.Group>
                </div>
                <div className="home-address">
                  <Form.Group>
                    <label>Work</label>
                    <div className="d-flex align-items-center">
                      <p>
                        <span>3891 Ranchview Dr. Richardson </span><br />
                        <span>California 62639</span>
                      </p>
                      <div className="icons-list ms-auto">
                        <button className="btn p-1"><FiEdit /></button>
                        <button className="btn p-1"><FiTrash /></button>

                      </div>
                    </div>
                    {/* <input type="text" placeholder="Street Address" className="form-control" /> */}
                  </Form.Group>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )

}
export default AboutTabUpdateDetails