import {Link} from "react-router-dom";
import DeleteDialog from "./DeleteDialog.tsx";
import {Course} from "../types/courseTypes.ts";
import {useContext, useState} from "react";
import {AuthContext} from "./AuthContext.tsx";

type CourseEntryProps = {
    course: Course,
    deleteCourse: (id: string) => void
}

export default function CourseEntry({course, deleteCourse}: Readonly<CourseEntryProps>) {
    const {isInstructor} = useContext(AuthContext);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    return (
        <li>
            <h3>{course.title}</h3>
            <p>{course.id}</p>
            <Link to={`/course/${course.id}`}>Details</Link>
            {isInstructor &&
                <>
                    <button onClick={() => setConfirmDelete(true)}>Delete</button>
                    <DeleteDialog course={course} modal={confirmDelete} closeModal={() => setConfirmDelete(false)}
                                  deleteCourse={deleteCourse}/>
                </>
            }
        </li>
    )
}