import {Link, Outlet, useParams} from "react-router-dom";
import {Course} from "../../types/courseTypes.ts";
import {useEffect} from "react";
import EditableTextDetail from "../../components/Shared/EditableTextDetail.tsx";
import {Instructor, Student} from "../../types/userTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import CourseActions from "../../components/Course/CourseActions.tsx";
import {
    Breadcrumbs, Container,
    Grid2, InputLabel, ListItem, ListItemText, Paper,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import CourseTabs from "../../components/Course/CourseTabs.tsx";
import CourseTabsMobile from "../../components/Course/CourseTabsMobile.tsx";
import {CourseContextType} from "../../hooks/useCourse.ts";
import EditableRichText from "../../components/Shared/EditableRichText.tsx";
import {calculateCourseGradeAverage, calculateStudentGradeAverage } from "../../utils/calculateGradeAverage.ts";
import GradeDisplay from "../../components/Shared/GradeDisplay.tsx";

type CoursePageProps = {
    updateCourse: (updatedProperty: string, updatedValue: string | string[]) => void,
    course: Course | undefined,
    fetchCourse: (courseId: string) => void,
    deleteCourse: (courseId: string) => void,
    students: Student[],
    instructors: Instructor[],
    updateUser: (courseId: string, isAdded: boolean) => void
}

export default function CourseDetailsPage({updateCourse, course, fetchCourse, deleteCourse, updateUser}: Readonly<CoursePageProps>) {
    const theme = useTheme();
    const isMobile = !(useMediaQuery(theme.breakpoints.up('sm')));
    const { courseId } = useParams();
    const {user, isInstructor} = useAuth();
    const gradeAverage: number | undefined = (course && user?.student?.grades[course.id]) ? calculateStudentGradeAverage(user.student.grades[course.id]) : undefined;
    const courseAverage : number | undefined = (course) && calculateCourseGradeAverage(course);


    useEffect(() =>{
        if (courseId) fetchCourse(courseId);
    },[courseId]);

    return (
        <>
        {course ?
                <Container>
                    <Breadcrumbs aria-label={"breadcrumb"}>
                        <Link to={"/"}>Dashboard</Link>
                        <Typography>{course?.title}</Typography>
                    </Breadcrumbs>
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
                            <Outlet context={{course} satisfies CourseContextType}/>

                        </Paper>
                    </Container>
                </Container>
            :
            <p>No course found.</p>
        }
        </>
    )
}