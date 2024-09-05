import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

export default function ProtectedRoutes() {
    const {user} = useAuth();

    if (user === undefined) {
        return <div>Loading...</div>
    }
    return user ? <Outlet/> : <Navigate to={"/login"}/>;
}

