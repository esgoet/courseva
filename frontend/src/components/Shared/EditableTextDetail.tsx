import {FormEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
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
        <form onSubmit={handleSubmit} className={`editable-detail ${props.inputType === "textarea" && "multiline"} ${editable && "editable"}`}>
            <TextField
                name={props.name}
                label={props.label}
                type={props.inputType}
                value={props.initialValue}
                onChange={(e)=>setInput(e.target.value)}
                disabled={!editable}
                autoFocus={editable}
                multiline={props.inputType === "textarea"}
                fullWidth={props.inputType === "textarea"}
                minRows={4}
                variant={editable ? "outlined" : "standard"}
                sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                        color: props.name==="title" ? '#4c83f5' : '#fff',
                        fontWeight: props.name==="title" ? '700' : '400',
                        WebkitTextFillColor: props.name==="title" ? '#4c83f5' : '#fff',
                        fontSize: props.name==="title" ? '20px' : '16px',
                        width: props.name==="title" ? props.initialValue.length+'ch' : 'auto',
                        height: "auto"
                    },
                    "& .MuiInputBase-input": {
                        width: props.name==="title" ? (props.initialValue.length+7)+'ch' : 'auto',
                        height: "auto"
                    },
                }}
            />
            {editable && <IconButton type={"submit"}>
                <CheckIcon fontSize={"small"} color={"secondary"}/>
            </IconButton>}
            {!editable && props.allowedToEdit && <IconButton type={"button"} onClick={()=>setEditable(true)}>
                <EditIcon fontSize={"small"} color={"secondary"}/>
            </IconButton>}
            {editable && <IconButton type={"reset"} onClick={handleCancel}>
                <CancelIcon fontSize={"small"} color={"secondary"}/>
            </IconButton>}
        </form>
    )
}