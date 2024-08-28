import {Link, useParams} from "react-router-dom";
import {Course} from "../types/types.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {PLACEHOLDERS} from "../utils/constants.ts";

export default function CoursePage() {
    const params = useParams();
    const id : string | undefined = params.id;

    const [course, setCourse] = useState<Course | undefined>();

    const fetchCourse = () => {
        axios.get(`/api/courses/${id}`)
            .then((response) => setCourse(response.data))
            .catch((error) => {
                console.log(error.response.data);
                setCourse(undefined);
            })
    }

    useEffect(() =>{
        fetchCourse()
    },[])

    return (
        <>
            <Link to={"/"}>Back</Link>
            {course ?
            <>
                <h2>{course.title}</h2>
                <p>{course.id}</p>
                <p>{course.description}</p>
                <h3>Students</h3>
                <ul>
                    {course.students.map((courseStudent) => (
                        <li key={`student-${courseStudent}`}>{PLACEHOLDERS.map(student => student.id === courseStudent && student.name)}</li>
                        ))
                    }
                </ul>
                <h3>Instructors</h3>
                <ul>
                    {course.instructors.map((courseInstructor) => (
                        <li key={`student-${courseInstructor}`}>{PLACEHOLDERS.map(instructor => instructor.id === courseInstructor && instructor.name)}</li>
                    ))
                    }
                </ul>
            </>
            :
            <p>No course found.</p>}
        </>
    )
}