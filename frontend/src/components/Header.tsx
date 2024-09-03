import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1>Learning Management System</h1>
            <Link to={"/signup"}>Sign Up</Link>
            <Link to={"/login"}>Login</Link>
        </header>
    );
};