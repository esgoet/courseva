import CourseList from "../components/CourseList.tsx";
import {Course} from "../types/courseTypes.ts";
import {Link} from "react-router-dom";
import {AuthContext} from "../components/AuthContext.tsx";
import {useContext} from "react";

type DashboardProps = {
    courses: Course[],
    deleteCourse: (courseId: string) => void
}
export default function Dashboard({courses, deleteCourse}: Readonly<DashboardProps>) {
    const {user} = useContext(AuthContext);
    return (
        <>
        {user &&
            <>
                <p>Hello {user.username}</p>
                <Link to={"/course/create"}>Create a Course</Link>
                <CourseList
                    courses={courses
                        .filter(course => course.students.includes(user.id) || course.instructors.includes(user.id))
                        .toSorted((a, b) => a?.startDate.getTime() - b?.startDate.getTime())}
                    deleteCourse={deleteCourse}/>
                <h3>All Courses</h3>
                <CourseList courses={courses.toSorted((a, b) => a?.startDate.getTime() - b?.startDate.getTime())}
                            deleteCourse={deleteCourse}/>
            </>
        }
        </>
    )
}