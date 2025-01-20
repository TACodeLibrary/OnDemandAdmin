import { Card } from "react-bootstrap";

interface ValueCardsProps {
    title: string;
    value: string;
}

const ValueCards = ({ title, value }: ValueCardsProps) => (
    <Card className="darker simple-card">
        <Card.Body>
            <p>{title}</p>
            <h3>{value}</h3>
        </Card.Body>
    </Card>
);

export default ValueCards;