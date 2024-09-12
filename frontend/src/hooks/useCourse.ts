
import {useOutletContext} from "react-router-dom";
import {Course} from "../types/courseTypes.ts";

export type CourseContextType = {
    course: Course | undefined;
}

export const useCourse = () => {
    return useOutletContext<CourseContextType>();
};