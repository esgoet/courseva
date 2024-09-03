import {FormEvent, useContext, useState} from "react";
import {AuthContext} from "./AuthContext.tsx";


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
    const {isInstructor} = useContext(AuthContext);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.updateCourse(props.name, input);
        setEditable(false);
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
            {editable && <button type={"submit"}>Save</button>}
            {!editable && isInstructor && <button type={"button"} onClick={()=>setEditable(true)}>Edit</button>}

            {editable && <button type={"reset"} onClick={handleCancel}>Cancel</button>}
        </form>
    )
}