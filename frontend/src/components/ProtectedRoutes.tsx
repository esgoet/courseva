import {Navigate, Outlet} from "react-router-dom";
import {Instructor, Student} from "../types/userTypes.ts";

type ProtectedRoutesProps = {
    user: Student | Instructor | null | undefined
}

export default function ProtectedRoutes({user}: ProtectedRoutesProps) {
    if (user === undefined) {
        return <div>Loading...</div>
    }
    if (user) {
        return <Outlet />;
    }
    return <Navigate to={"/login"}/>;
}

