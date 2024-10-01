import {Lesson, LessonDto} from "../../../types/courseTypes.ts";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import EditableTextDetail from "../../../components/Shared/EditableTextDetail.tsx";
import {convertToLessonDto, convertToLessonDtoList} from "../../../utils/convertToLessonDto.ts";
import {Button, Stack} from "@mui/material";
import {useCurrentCourse} from "../../../hooks/useCurrentCourse.ts";
import EditableRichText from "../../../components/Shared/EditableRichText.tsx";
import {useCourses} from "../../../hooks/useCourses.ts";
import {useAuth} from "../../../hooks/useAuth.ts";

export default function LessonPage() {
    const [lesson, setLesson] = useState<LessonDto | undefined>();
    const {lessonId} = useParams();
    const {course} = useCurrentCourse();
    const {user} = useAuth();

    const {updateCourse} = useCourses();

    useEffect(()=>{
        if (course) {
            const currentLesson : Lesson | undefined = course.lessons.find(lesson => lesson.id === lessonId);
            if (currentLesson) setLesson(convertToLessonDto(currentLesson));
        }
    },[course, lessonId])

    const handleUpdate = (updatedProperty: string, updatedValue: string) => {
        if (lesson && course) {
            const updatedLesson = {...lesson,[updatedProperty]: updatedValue};
            setLesson(updatedLesson);
            updateCourse("lessons", convertToLessonDtoList(course.lessons)
               .map(lesson => lesson.id === lessonId ? updatedLesson : lesson));
        }
    }

    return (

        <>
            <Button component={Link} color={"info"} to={".."} relative={"path"} variant={"outlined"}>Back to All Lessons</Button>
            {lesson &&
                <Stack component={"section"} sx={{my: 2}} spacing={2}>
                    <EditableTextDetail inputType={"text"} label={"Lesson Title"} name={"title"}
                                        initialValue={lesson.title} updateFunction={handleUpdate} allowedToEdit={user?.instructor !== undefined || false}/>
                    <EditableTextDetail inputType={"datetime-local"} label={"Lesson Release"} name={"whenPublic"}
                                        initialValue={lesson.whenPublic} updateFunction={handleUpdate} allowedToEdit={user?.instructor !== undefined || false}/>
                    <EditableRichText label={"Content"} name={"content"} initialValue={lesson.content} updateFunction={handleUpdate} allowedToEdit={user?.instructor !== undefined || false}/>
                </Stack>
            }
        </>
    )
}