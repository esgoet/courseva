import CourseList from "../components/Course/CourseList/CourseList.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {Grid2, Paper} from "@mui/material";
import {useCourses} from "../hooks/useCourses.ts";
import CreateButton from "../components/Shared/CreateButton.tsx";


export default function Dashboard() {
    const {user} = useAuth();
    const {courses} = useCourses();

    return (
        <Paper elevation={3} square={false} sx={{p:'20px'}}>
        {user &&
                <Grid2 container spacing={2}>
                    <Grid2>
                        <p>Hello {user.student?.username ?? user.instructor?.username}!</p>
                    </Grid2>
                    <Grid2 size={12}>
                        <section>
                            <h3>Quick Actions</h3>
                            {user?.instructor && <CreateButton label={"Create Course"} baseUrl={"/course"}/>}
                        </section>
                    </Grid2>
                    <Grid2 size={12}>
                        <section>
                            <h2>Your Courses</h2>
                            <CourseList
                                courses={courses
                                    .filter(course => user.student ? course.students.includes(user.student.id) : user.instructor ? course.instructors.includes(user.instructor?.id) : course)
                                    .toSorted((a, b) => a?.startDate.getTime() - b?.startDate.getTime())} />
                        </section>
                    </Grid2>
                </Grid2>
        }
        </Paper>
    )
}