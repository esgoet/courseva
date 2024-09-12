import { AssignmentDto} from "../../../types/courseTypes.ts";
import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {convertToAssignmentDtoList} from "../../../utils/convertToAssignmentDto.ts";
import {Button, Grid2, InputLabel, TextField} from "@mui/material";
import {useCourse} from "../../../hooks/useCourse.ts";
import CustomRichTextEditor from "../../../components/Shared/CustomRichTextEditor.tsx";
import type {RichTextEditorRef} from "mui-tiptap";

type AssignmentCreatorProps = {
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void
}

export default function AssignmentCreator({ updateCourse}: Readonly<AssignmentCreatorProps>) {
    const {course} = useCourse();
    const [assignment, setAssignment] = useState<AssignmentDto>({
        id: "",
        title: "",
        description: "",
        whenPublic: new Date(Date.now()).toISOString().substring(0,19),
        deadline: "",
        submissions: []
    })
    const navigate = useNavigate();
    const rteRef = useRef<RichTextEditorRef>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAssignment({...assignment,[e.target.name]: e.target.value})
    }
    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (course) updateCourse("assignments", [assignment,...convertToAssignmentDtoList(course.assignments)])
        navigate("..",{ relative: "path" });
    }

    return (
        <>
            <Button component={Link} to={".."} relative={"path"} variant={"outlined"}>Back to All Assignments</Button>
            <h4>Create New Assignment</h4>
            <form onSubmit={handleSubmit}>
                <TextField
                    label={"Assignment Title"}
                    type={"text"}
                    name={"title"}
                    value={assignment.title}
                    onChange={handleChange}
                    autoCapitalize={"on"}
                    required
                    aria-required
                    autoFocus
                />
                <TextField
                    label={"Assignment Release"}
                    type={"datetime-local"}
                    name={"whenPublic"}
                    value={assignment.whenPublic}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    required
                    aria-required
                />
                <TextField
                    label={"Deadline"}
                    type={"datetime-local"}
                    name={"deadline"}
                    value={assignment.deadline}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    required
                    aria-required
                />

                <Grid2 container  spacing={2}>
                    <InputLabel shrink htmlFor={"assignment-description"}>Description</InputLabel>
                    <Grid2 size={12} id={"assignment-description"}>
                        <CustomRichTextEditor initialValue={""} ref={rteRef} />
                    </Grid2>
                    <Grid2 size={{xs:12,sm:6}}>
                        <Button type={"reset"} variant={'outlined'} fullWidth
                                onClick={() => setAssignment({
                                    id: "", title: "", description: "", whenPublic: new Date(Date.now()).toISOString().substring(0,19), deadline: "", submissions:[]
                                })}>Reset
                        </Button>
                    </Grid2>
                    <Grid2 size={{xs:12,sm:6}}>
                        <Button type={"submit"} fullWidth variant={'outlined'} color={"secondary"}>Create Assignment</Button>
                    </Grid2>
                </Grid2>
            </form>
        </>
    )
}