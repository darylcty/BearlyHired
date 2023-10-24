
import { Container,Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CustomNavBar({ greeting, dropdownItems}) {
    return (
            <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to="/">
                <img
                    src="https://i.imgur.com/oXRXyHi.png"
                    width="auto"
                    height="75"
                    style={{ marginRight: "20px" }}
                />
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Navbar.Text style={{ marginRight: "100px", direction: "flex"}}>{greeting}</Navbar.Text>

                {dropdownItems.map(item => (
                    <NavDropdown.Item
                        key={item.text}
                        onClick={item.onClick}
                        as={Link}
                        to={item.route}
                        style={{ align: "right", marginLeft: "100px" }}
                    >
                        {item.text}
                    </NavDropdown.Item>
                ))}
                </Navbar.Collapse>
            </Container>
            </Navbar>
        );
}
