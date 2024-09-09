import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

type DeleteDialogProps = {
    toConfirmId: string,
    toConfirmName: string,
    toConfirmAction: string,
    modal: boolean,
    closeModal: () => void,
    toConfirmFunction: (id: string) => void
}

export default function ConfirmDialog({toConfirmId, toConfirmName, toConfirmAction, modal, closeModal, toConfirmFunction}: Readonly<DeleteDialogProps>) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (modal) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [modal]);

    const handleConfirm = () => {
        toConfirmFunction(toConfirmId);
        closeModal();
        navigate("/");
    }

    return (
        <dialog autoFocus={true} ref={dialogRef} onCancel={closeModal}>
            <p>Are you sure you want to {toConfirmAction.toLowerCase()} {toConfirmName}? This action is irreversible.</p>
            <Button onClick={closeModal}>Cancel</Button>
            <Button onClick={handleConfirm}>{toConfirmAction.toUpperCase()}</Button>
        </dialog>
    )
}