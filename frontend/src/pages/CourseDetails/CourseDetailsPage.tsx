import {Link, Outlet, useParams} from "react-router-dom";
import {Course} from "../../types/courseTypes.ts";
import {useEffect, useState} from "react";
import EditableTextDetail from "../../components/Shared/EditableTextDetail.tsx";
import EditableListDetail from "../../components/Shared/EditableListDetail.tsx";
import DeleteDialog from "../../components/Shared/DeleteDialog.tsx";
import {Instructor, Student} from "../../types/userTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";

type CoursePageProps = {
    updateCourse: (updatedProperty: string, updatedValue: string | string[]) => void,
    course: Course | undefined,
    fetchCourse: (courseId: string) => void,
    deleteCourse: (courseId: string) => void,
    students: Student[],
    instructors: Instructor[]
}

export default function CourseDetailsPage({updateCourse, course, fetchCourse, deleteCourse, students, instructors}: Readonly<CoursePageProps>) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
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
                    <EditableTextDetail inputType={"text"} label={"Title"} name={"title"} initialValue={course.title} updateCourse={updateCourse}/>
                </h3>
                <p>{course.id}</p>
                {isInstructor &&
                    <>
                        <button onClick={() => setConfirmDelete(true)}>Delete Course</button>
                        <DeleteDialog course={course} modal={confirmDelete} closeModal={() => setConfirmDelete(false)}
                                      deleteCourse={deleteCourse}/>
                    </>
                }
                <EditableTextDetail inputType={"textarea"} label={"Description"} name={"description"}
                                    initialValue={course.description} updateCourse={updateCourse}/>
                <EditableTextDetail inputType={"date"} label={"Start Date"} name={"startDate"} initialValue={course.startDate.toISOString()} updateCourse={updateCourse}/>
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