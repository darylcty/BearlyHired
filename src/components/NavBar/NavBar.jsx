import CustomNavBar from "./CustomNavBar";
import * as usersService from "../../utils/users-service";

export default function NavBar({user, setUser}) {
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
				{ text: "Create a Company", route: "/company-creation" },
				{ text: "Admin Dashboard", route: "/admin-dashboard" },
				{ text: "Sign Out", route: "/" , onClick: handleLogOut},
			];
			} else {
			greeting = `Welcome back, ${user.name}!`;
			dropdownItems = [
				{ text: "Your Dashboard", route: "/dashboard" },
				{ text: "Sign Out", route: "/" , onClick: handleLogOut},
			];
			}
		} else {
			greeting = "";
				dropdownItems = [
					{ text: "Sign Up", route: "/sign-up" },
					{ text: "Log In", route: "/login" },
				];
		}


		return (
			<nav>
					<CustomNavBar greeting={greeting} dropdownItems={dropdownItems} />
			</nav>
		);
		}