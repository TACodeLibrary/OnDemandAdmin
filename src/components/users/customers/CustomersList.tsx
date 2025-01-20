import { Row, Col } from "react-bootstrap";
import ValueCards from "../../cards/ValueCards";

const CustomersListsCards = () => {
    const stats = [
        { title: "Total Users", value: "232" },
        { title: "Active Users", value: "240" },
        { title: "Users in Booking", value: "242" },
        { title: "New Registrations (This Month)", value: "133" },
    ];

    return (

        <Row>
            {stats.map((stat, index) => (
                <Col key={index}>
                    <ValueCards {...stat} />
                </Col>
            ))}
        </Row>
    );
};

export default CustomersListsCards;
