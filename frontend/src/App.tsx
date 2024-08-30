import './App.css'
import {useEffect, useState} from "react";
import {AssignmentDto, Course, CourseDto, LessonDto, NewCourseDto} from "./types/types.ts";
import axios, {AxiosResponse} from 'axios';
import {Route, Routes, useNavigate} from "react-router-dom";
import CoursePage from "./pages/CoursePage.tsx";
import CourseCreator from "./components/CourseCreator.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import LessonOverview from "./components/LessonOverview.tsx";
import AssignmentOverview from "./components/AssignmentOverview.tsx";
import LessonPage from "./components/LessonPage.tsx";
import AssignmentPage from "./components/AssignmentPage.tsx";
import LessonCreator from "./components/LessonCreator.tsx";
import AssignmentCreator from "./components/AssignmentCreator.tsx";
import SubmissionPage from "./components/SubmissionPage.tsx";
import {convertToCourse} from "./utils/convertToCourse.ts";

export default function App() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentCourse, setCurrentCourse] = useState<Course | undefined>();
    const navigate = useNavigate();

    const fetchCourses = () => {
        axios.get("/api/courses")
            .then((response : AxiosResponse<CourseDto[]>) => setCourses(response.data.map(convertToCourse)))
            .catch((error) => console.error(error.response.data))
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
            .catch((error) => console.error(error.response.data))
    }
    const fetchCourse = (id: string) => {
        axios.get(`/api/courses/${id}`)
            .then((response) => {
                setCurrentCourse(convertToCourse(response.data))
                console.log("fetching course")
            })
            .catch((error) => {
                console.error(error.response.data);
                setCurrentCourse(undefined);
            })
    }

    const updateCourse = (updatedProperty: string, updatedValue: string | string[] | LessonDto[] | AssignmentDto[]) => {
        axios.put(`/api/courses/${currentCourse?.id}`, {...currentCourse, [updatedProperty]: updatedValue})
            .then((response) => {
                if (response.status === 200) {
                    if (currentCourse?.id) fetchCourse(currentCourse.id);
                    fetchCourses();
                }
            })
            .catch((error)=>console.error(error.response.data))
    }

    const deleteCourse = (courseId: string) => {
        axios.delete(`/api/courses/${courseId}`)
            .then((response)=> response.status === 200 && fetchCourses())
            .catch((error)=> console.error(error.response.data))
    }

    return (
        <>
            <h1>Learning Management System</h1>
            <Routes>
                <Route path={"/"} element={ <Dashboard courses={courses} deleteCourse={deleteCourse}/> }/>
                <Route path={"/course/:courseId"} element={<CoursePage updateCourse={updateCourse} course={currentCourse} fetchCourse={fetchCourse} deleteCourse={deleteCourse}/>}>
                    <Route path={"lessons"} element={<LessonOverview lessons={currentCourse?.lessons} updateCourse={updateCourse}/>}/>
                    <Route path={"lessons/create"} element={<LessonCreator updateCourse={updateCourse} lessons={currentCourse?.lessons}/>}/>
                    <Route path={"lessons/:lessonId"} element={<LessonPage lessons={currentCourse?.lessons} updateCourse={updateCourse}/>}/>
                    <Route path={"assignments"} element={<AssignmentOverview assignments={currentCourse?.assignments} updateCourse={updateCourse}/>}/>
                    <Route path={"assignments/create"} element={<AssignmentCreator assignments={currentCourse?.assignments} updateCourse={updateCourse} />}/>
                    <Route path={"assignments/:assignmentId"} element={<AssignmentPage assignments={currentCourse?.assignments} updateCourse={updateCourse}/>}/>
                    <Route path={"assignments/:assignmentId/submission/:submissionId"} element={<SubmissionPage assignments={currentCourse?.assignments}/>}/>
                </Route>
                <Route path={"/course/create"} element={<CourseCreator createCourse={createCourse}/>}/>
            </Routes>
        </>
  )
}