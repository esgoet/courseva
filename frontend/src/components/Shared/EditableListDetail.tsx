import {FormEvent, useState} from "react";
import {Instructor, Student} from "../../types/userTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";

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
            {isInstructor && <button onClick={() => setEditable(!editable)}>{editable ? "Save" : "Edit"}</button>}
            {editable && <button type={"reset"} onClick={handleCancel}>Cancel</button>}
        </form>
    )
}