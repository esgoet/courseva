import {Link, Outlet, useParams} from "react-router-dom";
import {Course} from "../../types/courseTypes.ts";
import {useEffect} from "react";
import EditableTextDetail from "../../components/Shared/EditableTextDetail.tsx";
import {Instructor, Student} from "../../types/userTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import CourseActions from "../../components/Course/CourseActions.tsx";
import {
    Breadcrumbs,
    Grid2,
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
                    <Grid2 container spacing={{xs:2,md:4}}>
                        <Grid2 size={{xs:12,md:4}}>
                            <h2>
                                <EditableTextDetail inputType={"text"} label={"Title"} name={"title"}
                                                    initialValue={course.title} updateFunction={updateCourse}
                                                    allowedToEdit={isInstructor}/>
                            </h2>
                        </Grid2>
                        <Grid2 size={{xs:12,md:4}}>
                            <p>{course.id}</p>
                        </Grid2>
                        <Grid2 size={{xs:12,md:4}}>
                            <CourseActions course={course} deleteCourse={deleteCourse} updateUser={updateUser}
                                           updateCourse={updateCourse}/>
                        </Grid2>
                        <Grid2 size={{xs:12,md:8}}>
                            <EditableTextDetail inputType={"textarea"} label={"Description"} name={"description"}
                                                initialValue={course.description} updateFunction={updateCourse}
                                                allowedToEdit={isInstructor}/>
                        </Grid2>
                        <Grid2 size={{xs:12,md:4}}>
                            <EditableTextDetail inputType={"date"} label={"Start Date"} name={"startDate"}
                                                initialValue={course.startDate.toISOString()} updateFunction={updateCourse}
                                                allowedToEdit={isInstructor}/>
                        </Grid2>
                    </Grid2>
                    {isMobile ? <CourseTabsMobile/> :
                    <CourseTabs/>}
                    <Outlet/>
                </div>
            :
            <p>No course found.</p>
        }
        </>
    )
}