import {Link, Outlet, useParams} from "react-router-dom";
import {Course, CourseDto} from "../../types/courseTypes.ts";
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
import {useDataObject} from "../../hooks/useDataObject.ts";
import {convertToCourse} from "../../utils/convertToCourse.ts";
import DataStateHandler from "../../components/Shared/DataStateHandler.tsx";
import {useCourses} from "../../hooks/useCourses.ts";
import {CurrentCourseContext} from "../../context/CurrentCourseContext.ts";
import {useMemo} from "react";

type CoursePageProps = {
    updateUser: (courseId: string, isAdded: boolean) => void
}

export default function CourseDetailsPage({updateUser}: Readonly<CoursePageProps>) {
    const theme = useTheme();
    const isMobile = !(useMediaQuery(theme.breakpoints.up('sm')));
    const { courseId } = useParams();
    const {user, isInstructor} = useAuth();
    const {updateCourse, deleteCourse} = useCourses();
    const {data: currentCourse, setData: setCurrentCourse, loading, error} = useDataObject<CourseDto>(`/api/courses/${courseId}`);
    const currentCourseContextValue = useMemo(() => ({currentCourse, setCurrentCourse}), [currentCourse, setCurrentCourse]);
    const course: Course | undefined = currentCourse && convertToCourse(currentCourse);

    const gradeAverage: number | undefined = (course && user?.student?.grades[course.id]) ? calculateStudentGradeAverage(user.student.grades[course.id]) : undefined;
    const courseAverage : number | undefined = (course) && calculateCourseGradeAverage(course);

    return (
        <Container>
            <Breadcrumbs aria-label={"breadcrumb"}>
                <Link to={"/"}>Dashboard</Link>
                <Typography>{course?.title ?? `No course found`}</Typography>
            </Breadcrumbs>
            <DataStateHandler loading={loading} error={error} height={'70vh'}>
                {course &&
                    <>
                        <ListItem
                            secondaryAction={<CourseActions course={course} deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>}
                            disablePadding
                            component={"div"}
                            divider
                        >
                            <ListItemText secondary={course.id}>
                                <h2>
                                    <EditableTextDetail inputType={"text"} label={"Title"} name={"title"}
                                                        initialValue={course.title} updateFunction={updateCourse}
                                                        allowedToEdit={isInstructor}/>
                                </h2>
                            </ListItemText>
                        </ListItem>
                        <Paper sx={{p:'15px'}}>
                            <Grid2 container spacing={{xs:2,sm:4}} direction={{xs:'column-reverse', sm: 'row'}} >
                                <Grid2 size={{xs:12,sm:8}}>
                                    <EditableRichText label={"Description"} name={"description"} allowedToEdit={isInstructor} initialValue={course.description} updateFunction={updateCourse}/>
                                </Grid2>
                                <Grid2 size={{xs:12,sm:4}} display={"flex"} justifyContent={isMobile ? "flex-start" : "flex-end"} alignItems={"flex-start"}>
                                    <EditableTextDetail inputType={"date"} label={"Start Date"} name={"startDate"}
                                                        initialValue={course.startDate.toISOString().substring(0,10)} updateFunction={updateCourse}
                                                        allowedToEdit={isInstructor}/>
                                </Grid2>
                            </Grid2>
                            {gradeAverage &&
                                <>
                                    <InputLabel disabled shrink>Grade Average</InputLabel>
                                    <GradeDisplay grade={gradeAverage}/>
                                </>
                            }
                            {(isInstructor && courseAverage) &&
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
                                <CurrentCourseContext.Provider value={currentCourseContextValue}>
                                    <Outlet />
                                </CurrentCourseContext.Provider>

                            </Paper>
                        </Container>
                    </>
                }
            </DataStateHandler>
        </Container>
    )
}