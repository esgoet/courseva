import {Link, Outlet} from "react-router-dom";
import EditableTextDetail from "../../components/Shared/EditableTextDetail.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import CourseActions from "../../components/Course/CourseActions.tsx";
import {
    Breadcrumbs, Container,
    Grid2, InputLabel, ListItem, ListItemText, Paper,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import CourseTabs from "../../components/Course/CourseTabs.tsx";
import CourseTabsMobile from "../../components/Course/CourseTabsMobile.tsx";
import EditableRichText from "../../components/Shared/EditableRichText.tsx";
import {calculateCourseGradeAverage, calculateStudentGradeAverage } from "../../utils/calculateGradeAverage.ts";
import GradeDisplay from "../../components/Shared/GradeDisplay.tsx";
import {useCourses} from "../../hooks/useCourses.ts";
import {useCurrentCourse} from "../../hooks/useCurrentCourse.ts";
import DataStateHandler from "../../components/Shared/DataStateHandler.tsx";

export default function CourseDetailsPage() {
    const theme = useTheme();
    const isMobile = !(useMediaQuery(theme.breakpoints.up('sm')));
    const {user} = useAuth();
    const {course, loading, error} = useCurrentCourse();
    const {updateCourse} = useCourses();


    const gradeAverage: number | undefined = (course && user?.student?.grades[course.id]) ? calculateStudentGradeAverage(user.student.grades[course.id]) : undefined;
    const courseAverage : number | undefined = (course) && calculateCourseGradeAverage(course);

    return (
            <Container>
                <Breadcrumbs aria-label={"breadcrumb"}>
                    <Link to={"/"}>Dashboard</Link>
                    <Typography>{loading ? 'Loading...' : course?.title ?? `No course found`}</Typography>
                </Breadcrumbs>
                <DataStateHandler loading={loading} error={error} height={'70vh'}>
                    {course &&
                        <>
                            <ListItem
                                secondaryAction={<CourseActions course={course} />}
                                disablePadding
                                component={"div"}
                                divider
                            >
                                <ListItemText secondary={course.id}>
                                    <h2>
                                        <EditableTextDetail
                                            inputType={"text"}
                                            label={"Title"}
                                            name={"title"}
                                            initialValue={course.title}
                                            updateFunction={updateCourse}
                                            allowedToEdit={user?.instructor !== undefined || false}/>
                                    </h2>
                                </ListItemText>
                            </ListItem>
                            <Paper sx={{p:'15px'}}>
                                <Grid2 container spacing={{xs:2,sm:4}} direction={{xs:'column-reverse', sm: 'row'}} >
                                    <Grid2 size={{xs:12,sm:8}}>
                                        <EditableRichText label={"Description"} name={"description"} allowedToEdit={user?.instructor !== undefined || false} initialValue={course.description} updateFunction={updateCourse}/>
                                    </Grid2>
                                    <Grid2 size={{xs:12,sm:4}} display={"flex"} justifyContent={isMobile ? "flex-start" : "flex-end"} alignItems={"flex-start"}>
                                        <EditableTextDetail inputType={"date"} label={"Start Date"} name={"startDate"}
                                                            initialValue={course.startDate.toISOString().substring(0,10)} updateFunction={updateCourse}
                                                            allowedToEdit={user?.instructor !== undefined || false}/>
                                    </Grid2>
                                </Grid2>
                                {gradeAverage &&
                                    <>
                                        <InputLabel disabled shrink>Grade Average</InputLabel>
                                        <GradeDisplay grade={gradeAverage}/>
                                    </>
                                }
                                {(user?.instructor && courseAverage) &&
                                    <>
                                        <InputLabel disabled shrink>Course Average</InputLabel>
                                        <GradeDisplay grade={courseAverage}/>
                                    </>
                                }
                            </Paper>
                            <Container disableGutters sx={{mt: 2}}>
                                {isMobile ? <CourseTabsMobile/> :
                                    <CourseTabs/>}
                                <Paper sx={{p:'20px', pb: '40px'}} component={'section'} square={false}>
                                    <Outlet />
                                </Paper>
                            </Container>
                        </>
                    }
                </DataStateHandler>
            </Container>
    )
}