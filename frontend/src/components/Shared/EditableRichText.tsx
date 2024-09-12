import {Grid2, IconButton, InputLabel} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import {FormEvent, useRef, useState} from "react";

import StarterKit from "@tiptap/starter-kit";
import CustomRichTextEditor from "./CustomRichTextEditor.tsx";
import {RichTextEditorRef, RichTextReadOnly} from "mui-tiptap";

type EditableRichTextProps = {
    label: string,
    name: string,
    initialValue: string,
    updateFunction: (updatedProperty: string, updatedValue: string) => void,
    allowedToEdit: boolean
};

export default function EditableRichText(props: Readonly<EditableRichTextProps>) {
    const rteRef = useRef<RichTextEditorRef>(null);
    const [editable, setEditable] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.updateFunction(props.name, rteRef.current?.editor?.getHTML().toString() || props.initialValue);
        setEditable(false);
    }

    const handleCancel = () => {
        setEditable(false);
    }
    return (
        <>
            <form onSubmit={handleSubmit}
                  className={`editable-detail multiline ${editable && "editable"}`}>
                <Grid2 container >
                    <InputLabel shrink disabled={!editable} htmlFor={props.name}>{props.label}</InputLabel>

                    <Grid2 size={12} id={props.name}>
                    {editable ?
                            <CustomRichTextEditor initialValue={props.initialValue} ref={rteRef}/>
                        :
                            <RichTextReadOnly content={props.initialValue}
                                          extensions={[StarterKit]}/>
                    }

                    </Grid2>
                </Grid2>
                {editable && <IconButton type={"submit"}>
                    <CheckIcon fontSize={"small"} color={"secondary"}/>
                </IconButton>}
                {!editable && props.allowedToEdit && <IconButton type={"button"} onClick={() => setEditable(true)}>
                    <EditIcon fontSize={"small"} color={"secondary"}/>
                </IconButton>}
                {editable && <IconButton type={"reset"} onClick={handleCancel}>
                    <CancelIcon fontSize={"small"} color={"secondary"}/>
                </IconButton>}

            </form>
        </>
    );
};