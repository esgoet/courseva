import {Lesson, LessonDto} from "../types/types.ts";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

type CourseLessonOverviewProps = {
    lessons: Lesson[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: LessonDto[]) => void;
}

export default function CourseLessonOverview({lessons, updateCourse}: CourseLessonOverviewProps) {
    const [currentLessons, setCurrentLessons] = useState<Lesson[] | undefined>(lessons);
    useEffect(() => {
        setCurrentLessons(lessons)
    },[lessons])
    const deleteLesson = (lessonId: string) => {
        const updatedLessons : Lesson[] | undefined = currentLessons?.filter(lesson => lesson.id !== lessonId);
        if (updatedLessons) {
            setCurrentLessons(updatedLessons);
            updateCourse("lessons", updatedLessons.map(lesson => ({
                ...lesson,
                whenPublic: lesson.whenPublic.toString()})));
        }
    }
    return (
        <>
            <h3>Lessons</h3>
            <Link to={"create"}>Create New Lesson</Link>
            <ul>
                {currentLessons?.filter(lesson => new Date(lesson.whenPublic).valueOf() < Date.now()).map(lesson=> (
                    <li key={`lesson-${lesson.id}`}>
                        <Link to={`${lesson.id}`}>
                            <h4>{lesson.title}</h4>
                        </Link>
                        <button onClick={() => deleteLesson(lesson.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {/*    add lesson, lesson list with option to delete or edit*/}
        </>
    )
}