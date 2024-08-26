import './App.css'
import {useEffect, useState} from "react";
import {Course} from "./types/types.ts";
import axios from 'axios';

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
      <section>
        <h2>Courses</h2>
        {courses.map((course)=> (
            <article>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
            </article>
        ))}
      </section>
    </>
  )
}