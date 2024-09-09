import {FormEvent, useState} from "react";
import {IconButton} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

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
        <form onSubmit={handleSubmit} className={"editable-detail"}>
            <label htmlFor={props.name}>{props.label}</label>
            {props.inputType !== "textarea" ?
                <input type={props.inputType} name={props.name} value={input} onChange={(e)=>setInput(e.target.value)} disabled={!editable}/> :
                <textarea name={props.name} value={input} onChange={(e)=>setInput(e.target.value)} disabled={!editable} />}
            {editable && <IconButton type={"submit"}>
                <CheckIcon/>
            </IconButton>}
            {!editable && props.allowedToEdit && <IconButton type={"button"} onClick={()=>setEditable(true)}>
                <EditIcon/>
            </IconButton>}
            {editable && <IconButton type={"reset"} onClick={handleCancel}>
                <CancelIcon/>
            </IconButton>}
        </form>
    )
}