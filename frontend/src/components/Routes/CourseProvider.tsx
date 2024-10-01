import { CurrentCourseContext } from "../../context/CurrentCourseContext.ts";
import {useDataObject} from "../../hooks/useDataObject.ts";
import {CourseDto} from "../../types/courseTypes.ts";
import {useMemo} from "react";
import {Outlet, useParams} from "react-router-dom";


export default function CourseProvider() {

    const { courseId } = useParams();
    const {data: currentCourse, setData: setCurrentCourse, loading, error} = useDataObject<CourseDto>(`/api/courses/${courseId}`);
    const currentCourseContextValue = useMemo(() => ({currentCourse, setCurrentCourse, loading, error}), [currentCourse, setCurrentCourse, loading, error]);


    return (
        <CurrentCourseContext.Provider value={currentCourseContextValue}>
                <Outlet/>
        </CurrentCourseContext.Provider>
    );
};