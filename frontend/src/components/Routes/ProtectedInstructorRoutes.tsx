import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

export default function ProtectedInstructorRoutes() {
    const {user, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }
    if (user && !loading) {
        if (user.instructor) return <Outlet/>
        return <div>You cannot access this page. Please contact an admin if you believe this to be wrong.</div>
    }
    return <Navigate to={"/login"}/>
}

