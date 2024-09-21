
import {useContext, useMemo} from "react";
import {CurrentCourseContext} from "../context/CurrentCourseContext.ts";
import {convertToCourse} from "../utils/convertToCourse.ts";
import {Course} from "../types/courseTypes.ts";

export const useCurrentCourse = () => {
    const {currentCourse, setCurrentCourse} = useContext(CurrentCourseContext);
    const course: Course | undefined = currentCourse ? convertToCourse(currentCourse) : undefined;
    return useMemo(() => ({course, setCurrentCourse}), [course, setCurrentCourse]);
};