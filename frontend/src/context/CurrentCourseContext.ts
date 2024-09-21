import {createContext, Dispatch, SetStateAction} from "react";
import {CourseDto} from "../types/courseTypes.ts";

type CourseContextType = {
    currentCourse: CourseDto | undefined,
    setCurrentCourse: Dispatch<SetStateAction<CourseDto | undefined>>,
}

export const CurrentCourseContext = createContext<CourseContextType>({currentCourse: undefined, setCurrentCourse: () => {}});