import {Grid2, IconButton, InputLabel} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import {FormEvent, useRef, useState} from "react";
import CustomRichTextEditor from "./CustomRichTextEditor.tsx";
import {MenuButton, RichTextEditorRef, RichTextReadOnly} from "mui-tiptap";
import useExtensions from "../../hooks/useExtensions.ts";

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
    const extensions = useExtensions();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.updateFunction(props.name, rteRef.current?.editor?.getHTML().toString() || props.initialValue);
        setEditable(false);
    }

    const handleCancel = () => {
        setEditable(false);
    }
    return (
        <form onSubmit={handleSubmit}
              className={`editable-detail multiline`}
        >
            <Grid2 container size={12} >
                <InputLabel shrink disabled={!editable} htmlFor={props.name}>{props.label}</InputLabel>

                <Grid2 size={12} id={props.name}>
                {editable ?
                        <CustomRichTextEditor initialValue={props.initialValue} ref={rteRef} extraButtons={
                            <div>
                                <MenuButton
                                    tooltipLabel={"Cancel Edit"}
                                    IconComponent={CancelIcon}
                                    onClick={handleCancel}
                                    size={"small"}
                                    color={"secondary"}
                                />
                                <MenuButton
                                    tooltipLabel={"Save Edit"}
                                    IconComponent={CheckIcon}
                                    type={"submit"}
                                    size={"small"}
                                />
                            </div>
                        }/>
                    :
                        <RichTextReadOnly content={props.initialValue}
                                      extensions={extensions}/>
                }

                </Grid2>
            </Grid2>
            {!editable && props.allowedToEdit && <IconButton type={"button"} className={"edit-btn"} onClick={() => setEditable(true)}>
                <EditIcon fontSize={"small"} color={"secondary"}/>
            </IconButton>}

        </form>
    );
};