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
import {useUsers} from "../../hooks/useUsers.ts";

type EditableListDetailProps = {
    label: string,
    name: string,
    initialValue: string[],
    options: { data: Student[]|Instructor[], loading: boolean, error: Error | undefined}
}

export default function EditableUserList(props: Readonly<EditableListDetailProps>){
    const [editable, setEditable] = useState<boolean>(false);
    const [input, setInput ] = useState<string[]>(props.initialValue);

    const {user} = useAuth();
    const {course} = useCurrentCourse();
    const {updateCourse} = useCourses();
    const {updateUserCourses} = useUsers();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (course) {
            updateCourse(props.name, input);
            props.options.data.map((option)=> {
                if (input.includes(option.id) && !option.courses.includes(course.id)) {
                    updateUserCourses(course.id, true, option)
                } else if (!input.includes(option.id) && option.courses.includes(course.id)) {
                    updateUserCourses(course.id, false, option)
                }
            })
        }

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
            {user?.instructor &&
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