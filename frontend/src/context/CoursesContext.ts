import {createContext, Dispatch, SetStateAction} from "react";
import {CourseDto} from "../types/courseTypes.ts";

type CoursesContextType = {
    courses: CourseDto[],
    setCourses: Dispatch<SetStateAction<CourseDto[]>>,
    loading: boolean,
    error: Error | undefined
}

export const CoursesContext = createContext<CoursesContextType>({courses: [], setCourses: () => {}, loading: false, error: undefined});