import {Link, Outlet, useParams} from "react-router-dom";
import {Course} from "../../types/courseTypes.ts";
import {useEffect} from "react";
import EditableTextDetail from "../../components/Shared/EditableTextDetail.tsx";
import {Instructor, Student} from "../../types/userTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import CourseActions from "../../components/Course/CourseActions.tsx";
import {
    Breadcrumbs, Container,
    Grid2, ListItem, ListItemText, Paper,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import "./CourseDetailsPage.css";
import CourseTabs from "../../components/Course/CourseTabs.tsx";
import CourseTabsMobile from "../../components/Course/CourseTabsMobile.tsx";

type CoursePageProps = {
    updateCourse: (updatedProperty: string, updatedValue: string | string[]) => void,
    course: Course | undefined,
    fetchCourse: (courseId: string) => void,
    deleteCourse: (courseId: string) => void,
    students: Student[],
    instructors: Instructor[],
    updateUser: (updatedProperty: string, updatedValue: string[]) => void
}

export default function CourseDetailsPage({updateCourse, course, fetchCourse, deleteCourse, updateUser}: Readonly<CoursePageProps>) {
    const theme = useTheme();
    const isMobile = !(useMediaQuery(theme.breakpoints.up('sm')));
    const { courseId } = useParams();
    const {isInstructor} = useAuth();


    useEffect(() =>{
        if (courseId) fetchCourse(courseId);
    },[courseId]);

    return (
        <>
        {course ?
                <div className={"course-page"}>
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
                    <Paper sx={{p:'10px'}}>
                        <Grid2 container spacing={{xs:2,sm:4}} direction={{xs:'column-reverse', sm: 'row'}} >
                            <Grid2 size={{xs:12,sm:8}}>
                                <EditableTextDetail inputType={"textarea"} label={"Description"} name={"description"}
                                                    initialValue={course.description} updateFunction={updateCourse}
                                                    allowedToEdit={isInstructor}/>
                            </Grid2>
                            <Grid2 size={{xs:12,sm:4}} display={"flex"} justifyContent={isMobile ? "flex-start" : "flex-end"} alignItems={"flex-start"}>
                                <EditableTextDetail inputType={"date"} label={"Start Date"} name={"startDate"}
                                                    initialValue={course.startDate.toISOString().substring(0,10)} updateFunction={updateCourse}
                                                    allowedToEdit={isInstructor}/>
                            </Grid2>
                        </Grid2>
                    </Paper>
                    <Container disableGutters >
                        {isMobile ? <CourseTabsMobile/> :
                            <CourseTabs/>}
                        <Paper sx={{p:'20px', pb: '40px'}} component={'section'} square={false}>
                            <Outlet/>
                        </Paper>
                    </Container>
                </div>
            :
            <p>No course found.</p>
        }
        </>
    )
}