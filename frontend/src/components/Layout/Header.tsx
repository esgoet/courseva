import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.ts";
import {useContext} from "react";

type HeaderProps = {
    logout: () => void;
}


export default function Header({logout}:Readonly<HeaderProps>) {
    const {user} = useContext(AuthContext);

    return (
        <header>
            <h1>Learning Management System</h1>
            {user ? <button onClick={logout}>Logout</button> :
                <>
                    <Link to={"/register"}>Register</Link>
                    <Link to={"/login"}>Login</Link>
                </>
            }
        </header>
    );
};