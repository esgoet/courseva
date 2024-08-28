import {FormEvent, useState} from "react";
import {PLACEHOLDERS} from "../utils/constants.ts";

type EditableListDetailProps = {
    label: string,
    name: string,
    initialValue: string[],
    updateCourse: (updatedProperty: string, updatedValue: string[]) => void;
}

export default function EditableListDetail(props: Readonly<EditableListDetailProps>){
    const [editable, setEditable] = useState<boolean>(false);
    const [input, setInput ] = useState<string[]>(props.initialValue);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.updateCourse(props.name, input);
    }

    const handleCancel = () => {
        setEditable(false);
        setInput(props.initialValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={props.name}>{props.label}</label>
            <select name={props.name} value={input} onChange={(e)=>setInput([...e.target.selectedOptions].map(option => option.value))} disabled={!editable} multiple>
                {props.name === "students" ?
                    PLACEHOLDERS.map((student) => <option key={`student-${student.id}`} value={student.id}>{student.name}</option>) :
                    PLACEHOLDERS.map((instructor) => <option key={`instructor-${instructor.id}`} value={instructor.id}>{instructor.name}</option>)
                }
            </select>
            <button onClick={() => setEditable(!editable)}>{editable ? "Save" : "Edit"}</button>
            {editable && <button type={"reset"} onClick={handleCancel}>Cancel</button>}
        </form>
    )
}