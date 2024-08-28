import {FormEvent, useState} from "react";


type EditableTextDetailProps = {
    inputType : string,
    label: string,
    name: string,
    initialValue: string,
    updateCourse: (updatedProperty: string, updatedValue: string) => void;
}

export default function EditableTextDetail(props: Readonly<EditableTextDetailProps>){
    const [editable, setEditable] = useState<boolean>(false);
    const [input, setInput ] = useState<string>(props.initialValue);

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
            {props.inputType !== "textarea" ?
                <input type={props.inputType} name={props.name} value={input} onChange={(e)=>setInput(e.target.value)} disabled={!editable}/> :
                <textarea name={props.name} value={input} onChange={(e)=>setInput(e.target.value)} disabled={!editable} />}
            <button onClick={() => setEditable(!editable)}>{editable ? "Save" : "Edit"}</button>
            {editable && <button type={"reset"} onClick={handleCancel}>Cancel</button>}
        </form>
    )
}