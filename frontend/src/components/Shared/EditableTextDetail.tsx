import {FormEvent, useState} from "react";

type EditableTextDetailProps = {
    inputType : string,
    label: string,
    name: string,
    initialValue: string,
    updateFunction: (updatedProperty: string, updatedValue: string) => void,
    allowedToEdit: boolean
}

export default function EditableTextDetail(props: Readonly<EditableTextDetailProps>){
    const [editable, setEditable] = useState<boolean>(false);
    const [input, setInput ] = useState<string>(props.initialValue);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.updateFunction(props.name, input);
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
            {!editable && props.allowedToEdit && <button type={"button"} onClick={()=>setEditable(true)}>Edit</button>}

            {editable && <button type={"reset"} onClick={handleCancel}>Cancel</button>}
        </form>
    )
}