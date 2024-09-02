import {Lesson, LessonDto} from "../types/courseTypes.ts";

export function convertToLessonDto(lesson: Lesson) : LessonDto {
    return {...lesson, whenPublic: lesson.whenPublic.toString()}
}

export function convertToLessonDtoList(lessons: Lesson[]) : LessonDto[] {
    return lessons.map(lesson => ({
        ...lesson,
        whenPublic: lesson.whenPublic.toString()}))
}