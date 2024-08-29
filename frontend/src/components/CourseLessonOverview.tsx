import {Lesson, LessonDto} from "../types/types.ts";
import {Link} from "react-router-dom";
import { convertToLessonDtoList} from "../utils/convertToLessonDto.ts";


type CourseLessonOverviewProps = {
    lessons: Lesson[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: LessonDto[]) => void;
}

export default function CourseLessonOverview({lessons, updateCourse}: Readonly<CourseLessonOverviewProps>) {

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
                {lessons?.filter(lesson => new Date(lesson.whenPublic).valueOf() < Date.now()).map(lesson=> (
                    <li key={`lesson-${lesson.id}`}>
                        <Link to={`${lesson.id}`}>
                            <h4>{lesson.title}</h4>
                        </Link>
                        <button onClick={() => deleteLesson(lesson.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}