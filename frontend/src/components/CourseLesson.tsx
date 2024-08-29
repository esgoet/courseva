import {Lesson, LessonDto} from "../types/types.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import EditableTextDetail from "./EditableTextDetail.tsx";
import {convertToLessonDto, convertToLessonDtoList} from "../utils/convertToLessonDto.ts";

type CourseLessonProps = {
    lessons: Lesson[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: LessonDto[]) => void,
}

export default function CourseLesson({lessons, updateCourse}: Readonly<CourseLessonProps>) {
    const [lesson, setLesson] = useState<LessonDto | undefined>();
    const {lessonId} = useParams();

    useEffect(()=>{
        if (lessons) {
            const currentLesson : Lesson | undefined = lessons.find(lesson => lesson.id === lessonId);
            if (currentLesson) setLesson(convertToLessonDto(currentLesson));
        }
    },[lessons, lessonId])

    const handleUpdate = (updatedProperty: string, updatedValue: string) => {
        if (lesson && lessons) {
            const updatedLesson = {...lesson,[updatedProperty]: updatedValue};
            setLesson(updatedLesson);
            updateCourse("lessons", convertToLessonDtoList(lessons)
               .map(lesson => lesson.id === lessonId ? updatedLesson : lesson));
        }
    }

    return (

        <>
            {lesson &&
                <>
                    <h3>
                        <EditableTextDetail inputType={"text"} label={"Lesson Title"} name={"title"}
                                            initialValue={lesson.title} updateCourse={handleUpdate}/>
                    </h3>
                    <EditableTextDetail inputType={"datetime-local"} label={"Lesson Release"} name={"whenPublic"}
                                        initialValue={lesson.whenPublic} updateCourse={handleUpdate}/>
                    <EditableTextDetail inputType={"textarea"} label={"Lesson Content"} name={"content"}
                                        initialValue={lesson.content} updateCourse={handleUpdate}/>

                </>
            }
        </>
    )
}