import CourseList from "../components/Course/CourseList/CourseList.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {Grid2, Paper} from "@mui/material";
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
                            {userCourses ?
                                <CourseList
                                courses={userCourses
                                    .toSorted((a, b) => a?.startDate.getTime() - b?.startDate.getTime())} />
                                :
                                <p>No courses yet. <Link to={"/browse"}>Browse Courseva's selection!</Link></p>
                            }
                        </section>
                    </Grid2>
                </Grid2>
        }
        </Paper>
    )
}