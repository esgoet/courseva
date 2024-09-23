import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {LessonDto} from "../../../types/courseTypes.ts";
import {Link, useNavigate} from "react-router-dom";
import {convertToLessonDtoList} from "../../../utils/convertToLessonDto.ts";
import {Button, Grid2, InputLabel, TextField} from "@mui/material";
import {
    type RichTextEditorRef,
} from "mui-tiptap";
import CustomRichTextEditor from "../../../components/Shared/CustomRichTextEditor.tsx";
import {useCourses} from "../../../hooks/useCourses.ts";
import {useCurrentCourse} from "../../../hooks/useCurrentCourse.ts";

export default function LessonCreator() {
   const [lesson, setLesson] = useState<LessonDto>({
        id:"",
        title:"",
        content:"",
        whenPublic: new Date(Date.now()).toISOString().substring(0,19)
    });
    const {course} = useCurrentCourse();
    const navigate = useNavigate();
    const {updateCourse} = useCourses();
    const rteRef = useRef<RichTextEditorRef>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLesson({...lesson,[e.target.name]: e.target.value})
    }
    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newLesson: LessonDto = {...lesson, content: rteRef.current?.editor?.getHTML().toString() || ""};
        if (course) updateCourse("lessons", [newLesson,...convertToLessonDtoList(course.lessons)]);
        navigate("..",{ relative: "path" });
    }

    return (
        <>
            <Button component={Link} color={"info"} to={".."} relative={"path"} variant={"outlined"}>Back to All Lessons</Button>
            <h3>Create New Lesson</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label={"Lesson Title"}
                    type={"text"}
                    name={"title"}
                    value={lesson.title}
                    onChange={handleChange}
                    autoCapitalize={"on"}
                    required
                    aria-required
                    autoFocus
                />
                <TextField
                    label={"Lesson Release"}
                    type={"datetime-local"}
                    name={"whenPublic"}
                    value={lesson.whenPublic}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    required
                    aria-required
                />
                <Grid2 container spacing={2}>
                    <Grid2 size={12} id={"lesson-content"}>
                        <InputLabel shrink htmlFor={"lesson-content"}>Content</InputLabel>
                        <CustomRichTextEditor initialValue={""} ref={rteRef} />
                    </Grid2>
                    <Grid2 size={{xs:12,sm:6}}>
                        <Button type={"reset"} variant={'outlined'} fullWidth
                                onClick={() => setLesson({
                                    id: "", title: "", content: "", whenPublic: new Date(Date.now()).toISOString().substring(0,19)
                                })}>Reset
                        </Button>
                    </Grid2>
                    <Grid2 size={{xs:12,sm:6}}>
                        <Button type={"submit"} fullWidth variant={'outlined'} color={"secondary"}>Create Lesson</Button>
                    </Grid2>

                </Grid2>

            </form>
        </>
    )
}