import {Course, LessonDto} from "../../../types/courseTypes.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {convertToLessonDtoList} from "../../../utils/convertToLessonDto.ts";
import {Button, Grid2, TextField} from "@mui/material";

type LessonCreatorProps = {
    updateCourse: (updatedProperty: string, updatedValue: LessonDto[]) => void,
    course: Course | undefined
}

export default function LessonCreator({course, updateCourse}:Readonly<LessonCreatorProps>) {
    const [lesson, setLesson] = useState<LessonDto>({
        id:"",
        title:"",
        content:"",
        whenPublic: new Date(Date.now()).toISOString().substring(0,19)
    });
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLesson({...lesson,[e.target.name]: e.target.value})
    }
    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (course) updateCourse("lessons", [lesson,...convertToLessonDtoList(course.lessons)])
        navigate("..",{ relative: "path" });
    }
    
    return (
        <>
            <Button component={Link} to={".."} relative={"path"} variant={"outlined"}>Back to All Lessons</Button>
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
                <TextField
                    label={"Content"}
                    name={"content"}
                    value={lesson.content}
                    onChange={handleChange}
                    autoCapitalize={"on"}
                    multiline
                    minRows={4}
                />
                <Grid2 container  spacing={2}>
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