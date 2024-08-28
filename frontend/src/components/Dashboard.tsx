import CourseList from "./CourseList.tsx";
import {Course} from "../types/types.ts";
import {Link} from "react-router-dom";

type DashboardProps = {
    courses: Course[]
}
export default function Dashboard({courses}: DashboardProps) {
    return (
        <>

            <Link to={"/course/create"}>Create a Course</Link>
            <CourseList courses={courses.sort((a,b)=> a?.startDate.getTime() - b?.startDate.getTime())}/>
        </>
    )
}