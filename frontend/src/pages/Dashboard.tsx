import CourseList from "../components/CourseList.tsx";
import {Course} from "../types/types.ts";
import {Link} from "react-router-dom";

type DashboardProps = {
    courses: Course[]
}
export default function Dashboard({courses}: Readonly<DashboardProps>) {
    return (
        <>
            <Link to={"/course/create"}>Create a Course</Link>
            <CourseList courses={courses.toSorted((a,b)=> a?.startDate.getTime() - b?.startDate.getTime())}/>
        </>
    )
}