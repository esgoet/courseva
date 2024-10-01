import CourseList from "../components/Course/CourseList/CourseList.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {
    Button,
    Grid2,
    Paper,
    Typography,
    Box,
    ListItem,
    List,
    ListItemButton,
    ListItemText, ListItemIcon
} from "@mui/material";
import {useCourses} from "../hooks/useCourses.ts";
import CreateButton from "../components/Shared/CreateButton.tsx";
import {Link} from "react-router-dom";
import PendingActionsIcon from "@mui/icons-material/PendingActions";


export default function Dashboard() {
    const {user} = useAuth();
    const {courses} = useCourses();

    const userCourses = user && courses
        .filter(course => user.student ? course.students.includes(user.student.id) : user.instructor ? course.instructors.includes(user.instructor?.id) : course)

    const today: number = new Date(Date.now()).valueOf();

    return (
        <Paper elevation={3} square={false} sx={{p:'20px'}}>
        {user &&
                <Grid2 container spacing={2}>
                    <Grid2 size={12} textAlign={"center"} sx={{fontSize: 'larger'}}>
                        <p className={'cursive-font'}>👋 Hello {user.student?.username ?? user.instructor?.username}!</p>
                    </Grid2>
                    <Grid2 size={12}>
                        <section>
                            <Typography variant={"h2"}>Overview</Typography>
                            <Grid2
                                container
                                direction={{xs: 'column', sm: 'row'}}
                                spacing={4}
                                sx={{width:'100%'}}
                                justifyContent={"space-between"}
                                alignItems={"stretch"}
                            >
                                <Grid2 size={{xs:12, sm: 6}}>
                                    <Paper variant={"outlined"} sx={{p: 2, pt: 0, height:'100%', maxHeight: '250px', overflowY: 'auto'}} square={false}>
                                        <Typography variant={"h3"} sx={{position:"sticky", top: -10, mt: 0, py: 2, bgcolor:'background.default'}} zIndex={'tooltip'}>
                                            Upcoming Deadlines
                                        </Typography>
                                        <List dense disablePadding>
                                        {userCourses?.map(course =>
                                            course.assignments
                                                .filter(assignment => assignment.whenPublic.valueOf() < today && assignment.deadline.valueOf() > today)
                                                .map(assignment =>
                                            <ListItem key={`upcoming-assignment-${assignment.id}`}
                                                disablePadding
                                                divider
                                            >
                                                <ListItemButton
                                                    component={Link}
                                                    to={`course/${course.id}/assignments/${assignment.id}`}
                                                >
                                                    <ListItemIcon sx={{display: 'flex', pr: '5px', minWidth: 'auto'}}>
                                                        <PendingActionsIcon fontSize={'medium'}/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={assignment.title} secondary={`${assignment.deadline.toDateString()}`}/>
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                    </Paper>
                                </Grid2>
                                <Grid2 size={{xs:12, sm: 6}}>
                                    <Paper variant={"outlined"} sx={{p: 2, pt: 0, height:'100%', maxHeight: '250px', overflowY: "auto"}} square={false}>
                                        <Typography variant={"h3"} sx={{position:"sticky", top: -10, mt: 0, py: 2, bgcolor:'background.default'}} zIndex={'tooltip'}>Quick Actions</Typography>
                                        <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                                            {user?.instructor &&
                                                <CreateButton label={"Create Course"} baseUrl={"/course"}/>}
                                            <Button variant={"outlined"} component={Link} to={"/browse"} color={"info"}>Browse
                                                Courses</Button>
                                            <Button variant={"outlined"} component={Link} to={"/account"}
                                                    color={"info"}>Go To Account
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Grid2>
                            </Grid2>

                        </section>
                    </Grid2>
                    <Grid2 size={12}>
                        <section>
                            <Typography variant={"h2"}>Your Courses</Typography>
                            {(userCourses && userCourses.length > 0) ?
                                <CourseList
                                    courses={userCourses
                                        .toSorted((a, b) => a?.startDate.getTime() - b?.startDate.getTime())}/>
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