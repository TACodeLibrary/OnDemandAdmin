import { Button } from "react-bootstrap";

const Header = () => {
    return (
        <header className="header">
            <div className="d-flex justify-content-between align-items-center">
                <p>Logo</p>
                <Button>Logout</Button>
            </div>
        </header>
    );
};

export default Header; 