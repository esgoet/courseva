import CourseList from "../components/Course/CourseList.tsx";
import {Course} from "../types/courseTypes.ts";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";

type DashboardProps = {
    courses: Course[],
    deleteCourse: (courseId: string) => void,
    updateUser: (updatedProperty: string, updatedValue: string[]) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
}
export default function Dashboard({courses, deleteCourse, updateUser, updateCourse}: Readonly<DashboardProps>) {
    const {user, isInstructor} = useAuth();
    return (
        <>
        {user &&
            <>
                <p>Hello {user.username}</p>
                <Link to={"/account"}>Your Account</Link>
                {isInstructor && <Link to={"/course/create"}>Create a Course</Link>}
                <CourseList
                    courses={courses
                        .filter(course => course.students.includes(user.id) || course.instructors.includes(user.id))
                        .toSorted((a, b) => a?.startDate.getTime() - b?.startDate.getTime())}
                    deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>
                <h3>All Courses</h3>
                <CourseList courses={courses.toSorted((a, b) => a?.startDate.getTime() - b?.startDate.getTime())}
                            deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>
            </>
        }
        </>
    )
}