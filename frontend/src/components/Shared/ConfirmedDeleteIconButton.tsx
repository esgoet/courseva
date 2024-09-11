import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "./ConfirmDialog.tsx";
import {useState} from "react";

type DeleteWithConfirmationButtonProps = {
    toConfirmId: string,
    toConfirmName: string,
    toConfirmFunction: (id: string) => void
};

export default function ConfirmedDeleteIconButton({toConfirmId, toConfirmName, toConfirmFunction}: Readonly<DeleteWithConfirmationButtonProps>) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    return (
        <>
            <IconButton edge={"end"} aria-label={"delete"} onClick={() => setConfirmDelete(true)}>
                <DeleteIcon fontSize={"small"} color={"secondary"}/>
            </IconButton>
            <ConfirmDialog toConfirmId={toConfirmId} toConfirmName={toConfirmName} toConfirmAction={"delete"} modal={confirmDelete} closeModal={() => setConfirmDelete(false)}
                           toConfirmFunction={toConfirmFunction}/>
        </>
    );
};