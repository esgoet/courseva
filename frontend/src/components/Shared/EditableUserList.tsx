import {FormEvent, useState} from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import {IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import UserCheckList from "./UserCheckList.tsx";
import {useCurrentCourse} from "../../hooks/useCurrentCourse.ts";
import {Instructor, Student} from "../../types/userTypes.ts";
import {useCourses} from "../../hooks/useCourses.ts";

type EditableListDetailProps = {
    label: string,
    name: string,
    initialValue: string[],
    options: { data: Student[]|Instructor[], loading: boolean, error: Error | undefined}
}

export default function EditableUserList(props: Readonly<EditableListDetailProps>){
    const [editable, setEditable] = useState<boolean>(false);
    const [input, setInput ] = useState<string[]>(props.initialValue);
    const {isInstructor} = useAuth();
    const {course} = useCurrentCourse();
    const {updateCourse} = useCourses();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (course) updateCourse(props.name, input);
    }

    const handleCancel = () => {
        setEditable(false);
        setInput(props.initialValue);
    }

    return (
        <form onSubmit={handleSubmit} className={`editable-detail multiselect  ${editable && "editable"}`}>
            <label htmlFor={props.name}>{props.label}</label>
            <UserCheckList editable={editable} options={props.options} currentOptions={input}
                           setCurrentOptions={setInput} course={course}/>
            {isInstructor &&
                <IconButton onClick={() => setEditable(!editable)}>
                    {editable ? <CheckIcon fontSize={"small"} color={"secondary"}/> :
                        <EditIcon fontSize={"small"} color={"secondary"}/>}
                </IconButton>}
            {editable && <IconButton type={"reset"} onClick={handleCancel}>
                <CancelIcon fontSize={"small"} color={"secondary"}/>
            </IconButton>}
        </form>
    )
}