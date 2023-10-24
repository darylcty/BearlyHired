import { Container, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomNavBar from "./CustomNavBar";
import * as usersService from "../../utils/users-service";

export default function NavBar({user, setUser}) {
    const navigate = useNavigate();
	let greeting = "";
	let dropdownItems = [];

    function handleLogOut() {
        usersService.logOut();
        setUser(null);
    }
		if (user) {
			if (user.isAdmin) {
			greeting = `Hail, ${user.name}!`;
			dropdownItems = [
				{ text: "Create a Company", route: "/companycreation" },
				{ text: "Admin Dashboard", route: "/" },
				{ text: "Sign Out", route: "/" , onClick: handleLogOut},
			];
			} else {
			greeting = `Welcome back, ${user.name}!`;
			dropdownItems = [
				{ text: "Job Applications", route: "/jobs" },
				{ text: "Sign Out", route: "/" , onClick: handleLogOut},
			];
			}
		} else {
			greeting = "";
				dropdownItems = [
					{ text: "Sign Up", route: "/signup" },
					{ text: "Log In", route: "/login" },
				];
		}


		return (
			<nav>
					<CustomNavBar greeting={greeting} dropdownItems={dropdownItems} />
			</nav>
		);
		}
        // <nav>
        //     {user ? (
		// 		<>
		// 			{user.isAdmin ? (
		// 				<>
		// 					<Navbar expand="lg" className="bg-body-tertiary">
		// 						<Container>
		// 							<Link to="/">
		// 								<img
		// 								src="https://i.imgur.com/oXRXyHi.png"
		// 								width="auto"
		// 								height="75"
		// 								style={{ marginRight: "20px" }}
		// 								/>
		// 							</Link>
		// 							<Navbar.Toggle aria-controls="basic-navbar-nav"/>
		// 								<Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
		// 									<Navbar.Collapse>
		// 										<Navbar.Text>Hail, {user.name}!</Navbar.Text>
		// 									</Navbar.Collapse>
		// 										<NavDropdown
		// 										title="Your Jobs"
		// 										id="basic-nav-dropdown"
		// 										style={{ marginRight: "30px" }}>
		// 											<Nav.Link onClick={() => navigate("/companycreation")}>Create a Company</Nav.Link>
		// 											<NavDropdown title="Your Assertion" id="basic-nav-dropdown">
		// 											<NavDropdown.Item onClick={() => navigate("/dashboard")}>
		// 												Your Rights
		// 											</NavDropdown.Item>
		// 											<NavDropdown.Divider />
		// 											<NavDropdown.Item
		// 												onClick={() => {
		// 													navigate("/");
		// 													handleLogOut();
		// 												}}>
		// 												Dismiss Your Responsibilities
		// 											</NavDropdown.Item>
		// 										</NavDropdown>
		// 								</Navbar.Collapse>
		// 							</Container>
		// 						</Navbar>
		// 		</>
		// 		): (
		// 			<>
		// 				<Navbar expand="lg" className="bg-body-tertiary">
		// 					<Container>
		// 						<Link to="/">
		// 							<img
		// 							src="https://i.imgur.com/oXRXyHi.png"
		// 							width="auto"
		// 							height="75"
		// 							style={{ marginRight: "20px" }}
		// 							/>
		// 						</Link>
		// 						<Navbar.Toggle aria-controls="basic-navbar-nav"/>
		// 							<Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
		// 								<Navbar.Collapse>
		// 									<Navbar.Text>Welcome back, {user.name}!</Navbar.Text>
		// 								</Navbar.Collapse>
		// 									<NavDropdown
		// 									title="Your Jobs"
		// 									id="basic-nav-dropdown"
		// 									style={{ marginRight: "30px" }}>
		// 										<NavDropdown.Item onClick={() => navigate("/jobs")}>
		// 											Job Applications
		// 										</NavDropdown.Item>
		// 										<NavDropdown.Item onClick={() => navigate("/interviews")}>
		// 											Interviews
		// 										</NavDropdown.Item>
		// 										<NavDropdown.Item onClick={() => navigate("/offers")}>
		// 											Offers
		// 										</NavDropdown.Item>
		// 										</NavDropdown>
		// 									<NavDropdown title="Your Dashboard" id="basic-nav-dropdown">
		// 										<NavDropdown.Item onClick={() => navigate("/dashboard")}>
		// 											Your Dashboard
		// 										</NavDropdown.Item>
		// 										<NavDropdown.Divider />
		// 										<NavDropdown.Item
		// 											onClick={() => {
		// 												navigate("/");
		// 												handleLogOut();
		// 											}}>
		// 											Sign Out
		// 										</NavDropdown.Item>
		// 									</NavDropdown>
		// 							</Navbar.Collapse>
		// 						</Container>
		// 					</Navbar>
		// 				</>
        //     )} : (
        //         <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
		// 			<Container>
		// 				<Navbar.Brand className="logo"
		// 					onClick={() => navigate(`/`)} aria-controls="basic-navbar-nav">
		// 						<img
		// 						src="https://i.imgur.com/oXRXyHi.png"
		// 						width="auto"
		// 						height="75"
		// 						style={{ marginRight: "20px" }}
		// 						/>
		// 				</Navbar.Brand>
		// 				<Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
		// 				<Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
		// 					<Nav>
		// 						<Nav.Link onClick={() => navigate("/login")}>Log In</Nav.Link>
		// 						<Button onClick={() => navigate("/signup")} variant="success" style={{ marginLeft: "20px"}}>Sign Up</Button>
		// 					</Nav>
		// 				</Navbar.Collapse>
		// 			</Container>
		// 		</Navbar>
        //     )}
        // </nav>
        // );
	