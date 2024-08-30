import {Lesson, LessonDto} from "../types/types.ts";

export function convertToLessonDto(lesson: Lesson) : LessonDto {
    return {...lesson, whenPublic: lesson.whenPublic.toString()}
}

export function convertToLessonDtoList(lessons: Lesson[]) : LessonDto[] {
    return lessons.map(lesson => ({
        ...lesson,
        whenPublic: lesson.whenPublic.toString()}))
}