import {Lesson, LessonDto} from "../types/types.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type CourseLessonCreatorProps = {
    updateCourse: (updatedProperty: string, updatedValue: LessonDto[]) => void,
    lessons: Lesson[] | undefined
}

export default function CourseLessonCreator({updateCourse, lessons}:CourseLessonCreatorProps) {
    const [lesson, setLesson] = useState<LessonDto>({id:"",title:"",content:"",whenPublic:""});
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLesson({...lesson,[e.target.name]: e.target.value})
    }
    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (lessons) updateCourse("lessons", [lesson,...lessons.map(lesson => ({
            ...lesson,
            whenPublic: lesson.whenPublic.toString()}))])
        navigate("..",{ relative: "path" });
    }
    
    return (
        <>
            <h4>Create New Lesson</h4>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Required Lessson Information</legend>
                    <label htmlFor={"title"}>Lesson Title</label>
                    <input type={"text"} name={"title"} value={lesson.title} onChange={handleChange}
                           placeholder={"Enter Lesson Title"} autoCapitalize={"on"} required aria-required/>
                    <label htmlFor={"whenPublic"}>When should the lesson go public?</label>
                    <input type={"datetime-local"} name={"whenPublic"} value={lesson.whenPublic.toString()} onChange={handleChange} required
                           aria-required/>
                </fieldset>
                <fieldset>
                    <legend>Optional</legend>
                    <label htmlFor={"content"}>Lesson Content</label>
                    <textarea name={"content"} value={lesson.content} onChange={handleChange}
                              placeholder={"Enter Lesson Content"} autoCapitalize={"on"}/>
                </fieldset>
                <button type={"reset"}
                        onClick={() => setLesson({
                            id: "", title: "", content: "", whenPublic: ""
                        })}>Reset
                </button>
                <button type={"submit"}>Create Lesson</button>
            </form>
        </>
    )
}