import {Link} from "react-router-dom";
import DeleteDialog from "../Shared/DeleteDialog.tsx";
import {Course} from "../../types/courseTypes.ts";
import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import JoinOrLeaveCourse from "../Shared/JoinOrLeaveCourse.tsx";

type CourseEntryProps = {
    course: Course,
    deleteCourse: (id: string) => void,
    updateUser: (updatedProperty: string, updatedValue: string[]) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
}

export default function CourseEntry({course, deleteCourse, updateUser, updateCourse}: Readonly<CourseEntryProps>) {
    const {isInstructor} = useAuth();
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);


    return (
        <li>
            <h3>{course.title}</h3>
            <p>{course.id}</p>
            <Link to={`/course/${course.id}`}>Details</Link>
            <JoinOrLeaveCourse course={course} updateUser={updateUser} updateCourse={updateCourse}/>
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