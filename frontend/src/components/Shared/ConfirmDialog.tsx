import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

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
        <Dialog
            open={modal}
            onClose={closeModal}
            aria-labelledby={"confirmation-dialog-title"}
            aria-describedby={"confirmation-dialog-description"}
        >
            <DialogTitle id={"confirmation-dialog-title"} sx={{textAlign: 'left'}}>
                {toConfirmAction} {toConfirmName}?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id={"confirmation-dialog-description"}>
                    Are you sure you want to {toConfirmAction.toLowerCase()} {toConfirmName}? This action is irreversible.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} >Cancel</Button>
                <Button onClick={handleConfirm} color={"secondary"} variant={"outlined"}>{toConfirmAction.toUpperCase()}</Button>
            </DialogActions>
        </Dialog>
    )
}