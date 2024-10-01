import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

export default function ProtectedRoutes() {
    const {user,loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }
    return (!loading && user) ? <Outlet/> : <Navigate to={"/login"}/>;
}

