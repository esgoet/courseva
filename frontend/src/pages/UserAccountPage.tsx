import EditableTextDetail from "../components/Shared/EditableTextDetail.tsx";
import { useAuth } from "../hooks/useAuth.ts";
import ConfirmDialog from "../components/Shared/ConfirmDialog.tsx";
import {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Grid2, Paper} from "@mui/material";

type UserAccountPageProps = {
    updateUser: (updatedProperty: string, updatedValue: string) => void;
    deleteUser: (id: string) => void;
};

export default function UserAccountPage({updateUser, deleteUser}: Readonly<UserAccountPageProps>) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const {user} = useAuth();

    return (
        <>
            <Button component={Link} to={"/"} variant={'outlined'}>Back to Dashboard</Button>
            {user &&
                <Paper sx={{p:'20px', mt: '10px'}} square={false}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{xs: 12, sm: 6}}>
                            <EditableTextDetail inputType={"text"} label={"Username"} name={"username"}
                                                initialValue={user.username} updateFunction={updateUser} allowedToEdit={true}/>
                        </Grid2>
                        <Grid2 size={{xs: 12, sm: 6}}>
                            <EditableTextDetail inputType={"email"} label={"Email"} name={"email"} initialValue={user.email}
                                                updateFunction={updateUser} allowedToEdit={true}/>
                        </Grid2>
                        <Grid2 size={12}>
                            <Button onClick={() => setConfirmDelete(true)} variant={"outlined"} fullWidth>Delete Account</Button>
                            <ConfirmDialog toConfirmId={user.id} toConfirmName={"your account"} toConfirmAction={"delete"} modal={confirmDelete} closeModal={() => setConfirmDelete(false)}
                                           toConfirmFunction={deleteUser}/>
                        </Grid2>
                    </Grid2>
                </Paper>
            }
        </>
    );
};