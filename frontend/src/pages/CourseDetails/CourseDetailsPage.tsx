import {Link, Outlet, useParams} from "react-router-dom";
import {Course} from "../../types/courseTypes.ts";
import {useEffect} from "react";
import EditableTextDetail from "../../components/Shared/EditableTextDetail.tsx";
import EditableListDetail from "../../components/Shared/EditableListDetail.tsx";
import {Instructor, Student} from "../../types/userTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import CourseActions from "../../components/Course/CourseActions.tsx";

type CoursePageProps = {
    updateCourse: (updatedProperty: string, updatedValue: string | string[]) => void,
    course: Course | undefined,
    fetchCourse: (courseId: string) => void,
    deleteCourse: (courseId: string) => void,
    students: Student[],
    instructors: Instructor[],
    updateUser: (updatedProperty: string, updatedValue: string[]) => void
}

export default function CourseDetailsPage({updateCourse, course, fetchCourse, deleteCourse, students, instructors, updateUser}: Readonly<CoursePageProps>) {
    const { courseId } = useParams();
    const {isInstructor} = useAuth();

    useEffect(() =>{
        if (courseId) fetchCourse(courseId);
    },[courseId]);

    return (
        <>
            <Link to={"/"}>Back</Link>
            {course ?
            <>
                <h3>
                    <EditableTextDetail inputType={"text"} label={"Title"} name={"title"} initialValue={course.title} updateFunction={updateCourse} allowedToEdit={isInstructor}/>
                </h3>
                <p>{course.id}</p>
                <CourseActions course={course} deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>
                <EditableTextDetail inputType={"textarea"} label={"Description"} name={"description"}
                                    initialValue={course.description} updateFunction={updateCourse} allowedToEdit={isInstructor}/>
                <EditableTextDetail inputType={"date"} label={"Start Date"} name={"startDate"} initialValue={course.startDate.toISOString()} updateFunction={updateCourse} allowedToEdit={isInstructor}/>
                <h3>Students</h3>
                <EditableListDetail label={"Students"} name={"students"} initialValue={course.students} updateCourse={updateCourse} options={students}/>
                <h3>Instructors</h3>
                <EditableListDetail label={"Instructors"} name={"instructors"} initialValue={course.instructors} updateCourse={updateCourse} options={instructors}/>
                <Link to={"lessons"}>Lessons</Link>
                <Link to={"assignments"}>Assignments</Link>
                <Outlet />
            </>
            :
            <p>No course found.</p>}
        </>
    )
}