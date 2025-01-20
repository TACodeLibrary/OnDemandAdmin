import { Card, Row, Col } from "react-bootstrap";
import ValueCards from "../cards/ValueCards";

const AllTime = () => {
    const stats = [
        { title: "Users", value: "2m" },
        { title: "Revenue", value: "5.8m SAR" },
        { title: "Earning", value: "20k" },
        { title: "Bookings", value: "20k" },
    ];

    return (
        <Card className="dark">
            <Card.Body>
                <h3 className="title-h2 mb-3">All Time</h3>
                <Row>
                    {stats.map((stat, index) => (
                        <Col key={index}>
                            <ValueCards {...stat} />
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AllTime;
