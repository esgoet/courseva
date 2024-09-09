import {FormEvent, useState} from "react";
import {Instructor, Student} from "../../types/userTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

type EditableListDetailProps = {
    label: string,
    name: string,
    initialValue: string[],
    updateCourse: (updatedProperty: string, updatedValue: string[]) => void,
    options: Student[] | Instructor[]
}

export default function EditableListDetail(props: Readonly<EditableListDetailProps>){
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
        <form onSubmit={handleSubmit} className={"editable-detail"}>
            <label htmlFor={props.name}>{props.label}</label>
            <select name={props.name} value={input} onChange={(e)=>setInput([...e.target.selectedOptions].map(option => option.value))} disabled={!editable} multiple>
                {props.options.map((option) => <option key={`${option.id}`} value={option.id}>{option.username}</option>)}
            </select>
            {isInstructor &&
                <IconButton onClick={() => setEditable(!editable)}>
                    {editable ? <CheckIcon/> : <EditIcon/>}
                </IconButton>}
            {editable && <IconButton type={"reset"} onClick={handleCancel}>
                <CancelIcon/>
            </IconButton>}
        </form>
    )
}