import { Row, Col, Card, Badge } from "react-bootstrap";
import NameAvatar from "../NameAvatar";
import { ProfileImage } from "../../utils/images";
import { BiSolidStar } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";

const CustomerHeaderProfile = () => {
  return (
    <Card className="darker">
      <Card.Body>
        <Row>
          <Col lg={6}>
            <div className="header-avatar d-flex align-items-center gap-3">
              <NameAvatar alt='profile' src={ProfileImage} />
              <div className="name-rating">
                <div className="d-flex align-items-center gap-2">
                  <p className="mb-0">Lisa Hayden</p>
                  <div className="d-flex align-items-center">
                    <div className="rating-icon me-1">
                      <BiSolidStar />
                    </div>
                    <span className="rating-number">4.8</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <p className="mb-0 small fw-lighter">352798273298</p>
                  <button className="btn p-1 text-white"><BsCopy /> </button>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="text-end">
              <Badge bg="success">Active</Badge>
            </div>

          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default CustomerHeaderProfile;