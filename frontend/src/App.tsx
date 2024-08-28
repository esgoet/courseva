import './App.css'
import {useEffect, useState} from "react";
import {Assignment, Course, CourseDto, Lesson, NewCourseDto} from "./types/types.ts";
import axios, {AxiosResponse} from 'axios';
import {Route, Routes, useNavigate} from "react-router-dom";
import CoursePage from "./components/CoursePage.tsx";
import CourseCreator from "./components/CourseCreator.tsx";
import Dashboard from "./components/Dashboard.tsx";
import {formatDate} from "./utils/formatDate.ts";
import CourseLessonOverview from "./components/CourseLessonOverview.tsx";
import CourseAssignmentOverview from "./components/CourseAssignmentOverview.tsx";
import CourseLesson from "./components/CourseLesson.tsx";
import CourseAssignment from "./components/CourseAssignment.tsx";
import CourseLessonCreator from "./components/CourseLessonCreator.tsx";

export default function App() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentCourse, setCurrentCourse] = useState<Course | undefined>();
    const navigate = useNavigate();
    const fetchCourses = () => {
        axios.get("/api/courses")
            .then((response : AxiosResponse<CourseDto[]>) => setCourses(response.data.map(course => ({...course, startDate: formatDate(course.startDate)}))))
            .catch((error) => console.log(error.response.data))
    }

    useEffect(()=>{
        fetchCourses();
        }, []);

    const createCourse = (course : NewCourseDto)  => {
        axios.post("/api/courses", course)
            .then((response : AxiosResponse<Course>) => {
                if (response.status === 200) {
                    fetchCourses();
                    navigate(`/course/${response.data.id}`)
                }
            })
            .catch((error) => console.log(error.response.data))
    }

    const updateCourse = (updatedProperty: string, updatedValue: string | string[] | Lesson[] | Assignment[]) => {
        axios.put(`/api/courses/${currentCourse?.id}`, {...currentCourse, [updatedProperty]: updatedValue})
            .then((response) => response.status === 200 && fetchCourses())
    }

    return (
        <>
            <h1>Learning Management System</h1>
            <Routes>
                <Route path={"/"} element={ <Dashboard courses={courses}/>}/>
                <Route path={"/course/:id"} element={<CoursePage updateCourse={updateCourse} course={currentCourse} setCourse={setCurrentCourse}/>}>
                    <Route path={"lessons"} element={<CourseLessonOverview lessons={currentCourse?.lessons} updateCourse={updateCourse}/>}/>
                    <Route path={"lessons/create"} element={<CourseLessonCreator/>}/>
                    <Route path={"lessons/:id"} element={<CourseLesson/>}/>
                    <Route path={"assignments"} element={<CourseAssignmentOverview assignments={currentCourse?.assignments}/>}/>
                    <Route path={"assignments/:id"} element={<CourseAssignment/>}/>
                </Route>
                <Route path={"/course/create"} element={<CourseCreator createCourse={createCourse}/>}/>
            </Routes>
        </>
  )
}