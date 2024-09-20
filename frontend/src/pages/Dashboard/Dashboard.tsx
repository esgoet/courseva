import CourseList from "../../components/Course/CourseList/CourseList.tsx";
import {Course} from "../../types/courseTypes.ts";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";
import {Button, Grid2, Paper} from "@mui/material";

type DashboardProps = {
    courses: Course[],
    deleteCourse: (courseId: string) => void,
    updateUser: (courseId: string, isAdded: boolean) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
}
export default function Dashboard({courses, deleteCourse, updateUser, updateCourse}: Readonly<DashboardProps>) {
    const {user, isInstructor} = useAuth();
    return (
        <Paper elevation={3} square={false} sx={{p:'20px'}}>
        {user &&
                <Grid2 container spacing={2}>
                    <Grid2>
                        <p>Hello {user.student?.username ?? user.instructor?.username}!</p>
                    </Grid2>
                    <Grid2>
                        {isInstructor && <Button component={Link} to={"/course/create"} variant={"outlined"} color={"secondary"}>Create a Course</Button>}
                    </Grid2>
                    <Grid2 size={12}>
                        <section>
                            <h2>Your Courses</h2>
                            <CourseList
                                courses={courses
                                    .filter(course => course.students.includes(user.id) || course.instructors.includes(user.id))
                                    .toSorted((a, b) => a?.startDate.getTime() - b?.startDate.getTime())}
                                deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>
                        </section>
                    </Grid2>
                </Grid2>
        }
        </Paper>
    )
}