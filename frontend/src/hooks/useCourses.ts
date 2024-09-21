import {AssignmentDto, CourseDto, LessonDto, NewCourseDto} from "../types/courseTypes.ts";
import axiosInstance from "../api/axiosInstance.ts";
import {AxiosResponse} from "axios";
import {convertToCourse} from "../utils/convertToCourse.ts";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {CoursesContext} from "../context/CoursesContext.ts";
import {useCurrentCourse} from "./useCurrentCourse.ts";

export const useCourses = () => {
    const {courses, setCourses, loading, error} = useContext(CoursesContext);
    const {course: currentCourse, setCurrentCourse} = useCurrentCourse();
    const navigate = useNavigate();

    const createCourse = (course : NewCourseDto)  => {
        axiosInstance.post("/api/courses", course)
            .then((response : AxiosResponse<CourseDto>) => {
                setCourses([...courses, response.data]);
                navigate(`/course/${response.data.id}`);
            })
            .catch((error) => console.error(error.response.data));
    }

    const updateCourse = (updatedProperty: string, updatedValue: string | string[] | LessonDto[] | AssignmentDto[], courseToUpdate = currentCourse) => {
        axiosInstance.put(`/api/courses/${courseToUpdate?.id}`, {...courseToUpdate, [updatedProperty]: updatedValue})
            .then((response: AxiosResponse<CourseDto>) => {
                const updatedCourse = response.data;
                setCourses(courses.map(course => course.id === updatedCourse.id ? updatedCourse : course));
                if (currentCourse && courseToUpdate === currentCourse) setCurrentCourse(updatedCourse);
            })
            .catch((error)=>console.error(error));
    }


    const deleteCourse = (courseId: string) => {
        axiosInstance.delete(`/api/courses/${courseId}`)
            .then(() => {
                setCourses(courses.filter(course => course.id !== courseId))
                navigate("/")
            })
            .catch((error)=> console.error(error.response.data))
    }

    return {courses: courses.map(convertToCourse), loading, error, createCourse, updateCourse, deleteCourse};
}