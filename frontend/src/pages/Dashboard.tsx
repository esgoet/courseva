import CourseList from "../components/Course/CourseList/CourseList.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {Button, Grid2, Paper, Typography} from "@mui/material";
import {useCourses} from "../hooks/useCourses.ts";
import CreateButton from "../components/Shared/CreateButton.tsx";
import {Link} from "react-router-dom";


export default function Dashboard() {
    const {user} = useAuth();
    const {courses} = useCourses();

    const userCourses = user && courses
        .filter(course => user.student ? course.students.includes(user.student.id) : user.instructor ? course.instructors.includes(user.instructor?.id) : course)

    return (
        <Paper elevation={3} square={false} sx={{p:'20px'}}>
        {user &&
                <Grid2 container spacing={2}>
                    <Grid2>
                        <p className={'cursive-font'}>Hello {user.student?.username ?? user.instructor?.username}!</p>
                    </Grid2>
                    <Grid2 size={12}>
                        <section>
                            <h2>Overview</h2>
                            <h3>Quick Actions</h3>
                            {user?.instructor && <CreateButton label={"Create Course"} baseUrl={"/course"}/>}
                            <Button variant={"outlined"} component={Link} to={"/browse"} color={"info"}>Browse Courses</Button>
                        </section>
                    </Grid2>
                    <Grid2 size={12}>
                        <section>
                            <h2>Your Courses</h2>
                            {(userCourses && userCourses.length > 0 ) ?
                                <CourseList
                                courses={userCourses
                                    .toSorted((a, b) => a?.startDate.getTime() - b?.startDate.getTime())} />
                                :
                                <Typography textAlign={"center"}>No courses yet. <Link to={"/browse"}>Browse</Link> Courseva's selection!</Typography>
                            }
                        </section>
                    </Grid2>
                </Grid2>
        }
        </Paper>
    )
}