import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.ts";
import {useContext} from "react";

export default function ProtectedRoutes() {
    const {user} = useContext(AuthContext);

    if (user === undefined) {
        return <div>Loading...</div>
    }
    return user ? <Outlet/> : <Navigate to={"/login"}/>;
}

