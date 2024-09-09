import JoinOrLeaveCourse from "./JoinOrLeaveCourse.tsx";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../Shared/ConfirmDialog.tsx";
import {Course} from "../../types/courseTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {useState} from "react";

type CourseActionsProps = {
    course: Course,
    deleteCourse: (id: string) => void,
    updateUser: (updatedProperty: string, updatedValue: string[]) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
};

export default function CourseActions({course, deleteCourse, updateUser, updateCourse}: Readonly<CourseActionsProps>) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const {isInstructor} = useAuth();

    return (
        <>
            <>
                <JoinOrLeaveCourse course={course} updateUser={updateUser} updateCourse={updateCourse}/>
                {isInstructor && <IconButton edge={"end"} aria-label={"delete"} onClick={() => setConfirmDelete(true)}>
                    <DeleteIcon/>
                </IconButton>}
                <ConfirmDialog toConfirmId={course.id} toConfirmName={course.title} toConfirmAction={"delete"} modal={confirmDelete} closeModal={() => setConfirmDelete(false)}
                               toConfirmFunction={deleteCourse}/>
            </>
        </>
    );
};