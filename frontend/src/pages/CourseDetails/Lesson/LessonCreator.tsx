import {Lesson, LessonDto} from "../../../types/courseTypes.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {convertToLessonDtoList} from "../../../utils/convertToLessonDto.ts";
import { Button } from "@mui/material";

type LessonCreatorProps = {
    updateCourse: (updatedProperty: string, updatedValue: LessonDto[]) => void,
    lessons: Lesson[] | undefined
}

export default function LessonCreator({updateCourse, lessons}:Readonly<LessonCreatorProps>) {
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
        if (lessons) updateCourse("lessons", [lesson,...convertToLessonDtoList(lessons)])
        navigate("..",{ relative: "path" });
    }
    
    return (
        <>
            <h4>Create New Lesson</h4>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Required Lesson Information</legend>
                    <label htmlFor={"title"}>Lesson Title</label>
                    <input type={"text"} name={"title"} value={lesson.title} onChange={handleChange}
                           placeholder={"Enter Lesson Title"} autoCapitalize={"on"} required aria-required/>
                    <label htmlFor={"whenPublic"}>Lesson Release</label>
                    <input type={"datetime-local"} name={"whenPublic"} value={lesson.whenPublic} onChange={handleChange} required
                           aria-required/>
                </fieldset>
                <fieldset>
                    <legend>Optional</legend>
                    <label htmlFor={"content"}>Lesson Content</label>
                    <textarea name={"content"} value={lesson.content} onChange={handleChange}
                              placeholder={"Enter Lesson Content"} autoCapitalize={"on"}/>
                </fieldset>
                <Button type={"reset"}
                        onClick={() => setLesson({
                            id: "", title: "", content: "", whenPublic: new Date(Date.now()).toISOString().substring(0,19)
                        })}>Reset
                </Button>
                <Button type={"submit"}>Create Lesson</Button>
            </form>
        </>
    )
}