import {Lesson, LessonDto} from "../types/courseTypes.ts";
import {Link} from "react-router-dom";
import { convertToLessonDtoList} from "../utils/convertToLessonDto.ts";
import {useContext} from "react";
import {AuthContext} from "./AuthContext.tsx";


type LessonOverviewProps = {
    lessons: Lesson[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: LessonDto[]) => void;
}

export default function LessonOverview({lessons, updateCourse}: Readonly<LessonOverviewProps>) {
    const {isInstructor} = useContext(AuthContext);

    const deleteLesson = (lessonId: string) => {
        if (lessons) {
            updateCourse("lessons", convertToLessonDtoList(lessons.filter(lesson => lesson.id !== lessonId)))
        }
    }
    return (
        <>
            <h3>Lessons</h3>
            <Link to={"create"}>Create New Lesson</Link>
            <ul>
                {isInstructor ? lessons?.toSorted((a, b) => a?.whenPublic.getTime() - b?.whenPublic.getTime()).map(lesson=> (
                    <li key={`lesson-${lesson.id}`}>
                        <Link to={`${lesson.id}`}>
                            <h4>{lesson.title}</h4>
                            </Link>
                        {lesson.whenPublic.valueOf() > Date.now() && <p>Unpublished</p>}
                        <button onClick={() => deleteLesson(lesson.id)}>Delete</button>
                    </li>
                )) :  lessons?.filter(lesson => lesson.whenPublic.valueOf() < Date.now()).toSorted((a, b) => a?.whenPublic.getTime() - b?.whenPublic.getTime()).map(lesson=> (
                    <li key={`lesson-${lesson.id}`}>
                        <Link to={`${lesson.id}`}>
                            <h4>{lesson.title}</h4>
                        </Link>
                    </li>
                ))
                }
            </ul>
        </>
    )
}