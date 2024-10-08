import EditableTextDetail from "../components/Shared/EditableTextDetail.tsx";
import { useAuth } from "../hooks/useAuth.ts";
import ConfirmDialog from "../components/Shared/ConfirmDialog.tsx";
import {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Grid2, Paper, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useUsers} from "../hooks/useUsers.ts";


export default function UserAccountPage() {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const {user, deleteUser, updateUser} = useAuth();
    const {updateStudent, updateInstructor} = useUsers();


    return (
        <>
            <Button component={Link} color={"info"} to={"/"} variant={'outlined'}>Back to Dashboard</Button>
            {user &&
                <Paper sx={{p:'20px', mt: '10px'}} square={false}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12} textAlign={"center"}>
                            <AccountCircle sx={{fontSize: 80}}/>
                        </Grid2>
                        <Grid2 size={12}>
                            <Typography variant={"h2"}>Account</Typography>
                        </Grid2>
                        <Grid2 size={{xs: 12, sm: 6}}>
                        <EditableTextDetail
                                inputType={"text"}
                                label={"Username"}
                                name={"username"}
                                initialValue={user.student?.username ?? user.instructor?.username ?? ""}
                                updateFunction={user?.instructor ? updateInstructor : updateStudent}
                                allowedToEdit={true}/>
                        </Grid2>
                        <Grid2 size={{xs: 12, sm: 6}}>
                            <EditableTextDetail inputType={"email"} label={"Email"} name={"email"}
                                                initialValue={user.email}
                                                updateFunction={updateUser} allowedToEdit={true}/>
                        </Grid2>
                        <Grid2 size={12}>
                            <Button onClick={() => setConfirmDelete(true)} variant={"outlined"} color={"secondary"} fullWidth>Delete
                                Account</Button>
                            <ConfirmDialog toConfirmId={user.id} toConfirmName={"your account"}
                                           toConfirmAction={"delete"} modal={confirmDelete}
                                           closeModal={() => setConfirmDelete(false)}
                                           toConfirmFunction={deleteUser}/>
                        </Grid2>
                    </Grid2>
                </Paper>
            }
        </>
    );
};