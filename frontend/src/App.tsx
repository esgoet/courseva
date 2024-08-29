import './App.css'
import {useEffect, useState} from "react";
import {Course, CourseDto, NewCourseDto} from "./types/types.ts";
import axios, {AxiosResponse} from 'axios';
import {Route, Routes, useNavigate} from "react-router-dom";
import CoursePage from "./components/CoursePage.tsx";
import CourseCreator from "./components/CourseCreator.tsx";
import Dashboard from "./components/Dashboard.tsx";
import {formatDate} from "./utils/formatDate.ts";

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
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

  return (
    <>
        <h1>Learning Management System</h1>
        <Routes>
            <Route path={"/"} element={ <Dashboard courses={courses}/>}/>
            <Route path={"/course/:id"} element={<CoursePage/>}/>
            <Route path={"/course/create"} element={<CourseCreator createCourse={createCourse}/>}/>
        </Routes>

    </>
  )
}