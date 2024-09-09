import CourseList from "../../components/Course/CourseList/CourseList.tsx";
import {Course} from "../../types/courseTypes.ts";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";
import {Paper} from "@mui/material";

type DashboardProps = {
    courses: Course[],
    deleteCourse: (courseId: string) => void,
    updateUser: (updatedProperty: string, updatedValue: string[]) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
}
export default function Dashboard({courses, deleteCourse, updateUser, updateCourse}: Readonly<DashboardProps>) {
    const {user, isInstructor} = useAuth();
    return (
        <Paper elevation={3} square={false} sx={{p:'20px'}}>
        {user &&
            <>
                <p>Hello {user.username}!</p>
                {isInstructor && <Link to={"/course/create"}>Create a Course</Link>}
                <section>
                    <h2>Your Courses</h2>
                    <CourseList
                        courses={courses
                            .filter(course => course.students.includes(user.id) || course.instructors.includes(user.id))
                            .toSorted((a, b) => a?.startDate.getTime() - b?.startDate.getTime())}
                        deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>
                </section>
            </>
        }
        </Paper>
    )
}