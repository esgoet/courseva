import {FormEvent, useState} from "react";
import {Instructor, Student} from "../../types/userTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import UserCheckList from "./UserCheckList.tsx";

type EditableListDetailProps = {
    label: string,
    name: string,
    initialValue: string[],
    updateCourse: (updatedProperty: string, updatedValue: string[]) => void,
    options: Student[] | Instructor[]
}

export default function EditableUserList(props: Readonly<EditableListDetailProps>){
    const [editable, setEditable] = useState<boolean>(false);
    const [input, setInput ] = useState<string[]>(props.initialValue);
    const {isInstructor} = useAuth();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.updateCourse(props.name, input);
    }

    const handleCancel = () => {
        setEditable(false);
        setInput(props.initialValue);
    }

    return (
        <form onSubmit={handleSubmit} className={`editable-detail multiselect  ${editable && "editable"}`}>
            <label htmlFor={props.name}>{props.label}</label>
            <UserCheckList editable={editable} options={props.options} currentOptions={input} setCurrentOptions={setInput}/>
            {isInstructor &&
                <IconButton onClick={() => setEditable(!editable)}>
                    {editable ? <CheckIcon fontSize={"small"} color={"secondary"}/> : <EditIcon fontSize={"small"} color={"secondary"}/>}
                </IconButton>}
            {editable && <IconButton type={"reset"} onClick={handleCancel}>
                <CancelIcon fontSize={"small"} color={"secondary"}/>
            </IconButton>}
        </form>
    )
}