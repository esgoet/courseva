import './App.css'
import {useEffect, useState} from "react";
import {Course} from "./types/types.ts";
import axios from 'axios';
import CourseList from "./components/CourseList.tsx";

export default function App() {
  const [courses, setCourses] = useState<Course[]>([])

  const fetchCourses = () => {
    axios.get("/api/courses")
        .then((response) => setCourses(response.data))
        .catch((error) => console.log(error))
  }

  useEffect(()=>{
    fetchCourses();
  }, [])

  return (
    <>
      <h1>Learning Management System</h1>
      <CourseList courses={courses}/>
    </>
  )
}