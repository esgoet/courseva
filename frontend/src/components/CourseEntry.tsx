import {Link} from "react-router-dom";
import DeleteDialog from "./DeleteDialog.tsx";
import {Course} from "../types/courseTypes.ts";
import {useState} from "react";

type CourseEntryProps = {
    course: Course,
    deleteCourse: (id: string) => void
}

export default function CourseEntry({course, deleteCourse}: Readonly<CourseEntryProps>) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    return (
        <li>
            <h3>{course.title}</h3>
            <p>{course.id}</p>
            <Link to={`/course/${course.id}`}>Details</Link>
            <button onClick={() => setConfirmDelete(true)}>Delete</button>
            <DeleteDialog course={course} modal={confirmDelete} closeModal={() => setConfirmDelete(false)}
                          deleteCourse={deleteCourse}/>
        </li>
    )
}