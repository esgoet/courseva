import {Link} from "react-router-dom";
import DeleteDialog from "../Shared/DeleteDialog.tsx";
import {Course} from "../../types/courseTypes.ts";
import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.ts";

type CourseEntryProps = {
    course: Course,
    deleteCourse: (id: string) => void
}

export default function CourseEntry({course, deleteCourse}: Readonly<CourseEntryProps>) {
    const {isInstructor} = useAuth();
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