import { Card, Row, Col } from "react-bootstrap";

const AllTime = () => {
    return (
        <Card className="dark">
            <Card.Body>
                <h3 className="title-h2 mb-3">All Time</h3>
                <Row>
                    <Col>
                        <Card className="darker simple-card">
                            <Card.Body>
                                <p>Users</p>
                                <h3>2m</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="darker simple-card">
                            <Card.Body>
                                <p>Revenue</p>
                                <h3>5.8m SAR</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="darker simple-card">
                            <Card.Body>
                                <p>Earning</p>
                                <h3>20k</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="darker simple-card">
                            <Card.Body>
                                <p>Bookings</p>
                                <h3>20k</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AllTime;
