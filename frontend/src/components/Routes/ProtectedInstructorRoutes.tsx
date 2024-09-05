import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

export default function ProtectedInstructorRoutes() {
    const {user, isInstructor} = useAuth();

    if (user === undefined) {
        return <div>Loading...</div>
    }
    if (user) {
        if (isInstructor) return <Outlet/>
        return <div>You cannot access this page. Please contact an admin if you believe this to be wrong.</div>
    }
    return <Navigate to={"/login"}/>
}

