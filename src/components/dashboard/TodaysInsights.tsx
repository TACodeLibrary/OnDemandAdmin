import { Card, Row, Col } from "react-bootstrap";

const TodaysInsights = () => {
    return (
        <Card className="dark">
            <Card.Body>
                <h3 className="title-h2 mb-3">Todays Insights</h3>
                <Row>
                    <Col lg={6}>
                        <Card className="darker simple-card">
                            <Card.Body>
                                <p>Earnings</p>
                                <h3>2m</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card className="darker simple-card">
                            <Card.Body>
                                <p>Bookings</p>
                                <h3>5.8m SAR</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card className="darker simple-card">
                            <Card.Body>
                                <p>Registered Users</p>
                                <h3>20k</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card className="darker simple-card">
                            <Card.Body>
                                <p>Revenue</p>
                                <h3>20k</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default TodaysInsights;
