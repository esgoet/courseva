import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.ts";
import {useContext} from "react";

export default function ProtectedInstructorRoutes() {
    const {user, isInstructor} = useContext(AuthContext);

    if (user === undefined) {
        return <div>Loading...</div>
    }

    return isInstructor && user ? <Outlet/> : user ? <div>You cannot access this page. Please contact an admin if you believe this to be wrong.</div> : <Navigate to={"/login"}/>
}

