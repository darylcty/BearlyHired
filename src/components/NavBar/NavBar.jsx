import { Link } from "react-router-dom";
import * as usersService from "../../utils/users-service";

export default function NavBar({user, setUser}) {
    console.log("NavBar user: ", user);

    function handleLogOut() {
        usersService.logOut();
        setUser(null);
    }
    return (
        <nav>
            <Link to="/orders">Order History</Link>
            &nbsp; | &nbsp;
            <Link to="/orders/new">New Order</Link>
            &nbsp; | &nbsp;
            <span>Welcome, {user.name}! </span>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    );
}