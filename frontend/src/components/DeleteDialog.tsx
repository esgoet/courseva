import {useEffect, useRef} from "react";
import {Course} from "../types/types.ts";
import {useNavigate} from "react-router-dom";

type DeleteDialogProps = {
    course: Course,
    modal: boolean,
    closeModal: () => void,
    deleteCourse: (id: string) => void
}

export default function DeleteDialog({course, modal, closeModal, deleteCourse}: Readonly<DeleteDialogProps>) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (modal) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [modal]);

    const handleDelete = () => {
        deleteCourse(course.id);
        closeModal();
        navigate("/");
    }

    return (
        <dialog autoFocus={true} ref={dialogRef} onCancel={closeModal}>
            <p>Are you sure you want to delete this course?</p>
            <p>{course.title} starting on {course.startDate.toDateString()}</p>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
        </dialog>
    )
}