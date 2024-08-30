import CourseList from "../components/CourseList.tsx";
import {Course} from "../types/types.ts";
import {Link} from "react-router-dom";

type DashboardProps = {
    courses: Course[],
    deleteCourse: (courseId: string) => void
}
export default function Dashboard({courses,deleteCourse}: Readonly<DashboardProps>) {
    return (
        <>
            <Link to={"/course/create"}>Create a Course</Link>
            <CourseList courses={courses.toSorted((a,b)=> a?.startDate.getTime() - b?.startDate.getTime())} deleteCourse={deleteCourse}/>
        </>
    )
}