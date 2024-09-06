import EditableTextDetail from "../components/Shared/EditableTextDetail.tsx";
import { useAuth } from "../hooks/useAuth.ts";
import ConfirmDialog from "../components/Shared/ConfirmDialog.tsx";
import {useState} from "react";
import {Link} from "react-router-dom";

type UserAccountPageProps = {
    updateUser: (updatedProperty: string, updatedValue: string) => void;
    deleteUser: (id: string) => void;
};

export default function UserAccountPage({updateUser, deleteUser}: Readonly<UserAccountPageProps>) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const {user} = useAuth();

    return (
        <>
            <Link to={"/"}>Back</Link>
            {user &&
                <>
                    <EditableTextDetail inputType={"text"} label={"Username"} name={"username"}
                                        initialValue={user.username} updateFunction={updateUser} allowedToEdit={true}/>
                    <EditableTextDetail inputType={"email"} label={"Email"} name={"email"} initialValue={user.email}
                                        updateFunction={updateUser} allowedToEdit={true}/>
                    <button onClick={() => setConfirmDelete(true)}>Delete Account</button>
                    <ConfirmDialog toConfirmId={user.id} toConfirmName={"your account"} toConfirmAction={"delete"} modal={confirmDelete} closeModal={() => setConfirmDelete(false)}
                                   toConfirmFunction={deleteUser}/>
                </>
            }
        </>
    );
};