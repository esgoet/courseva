import {Link, useParams} from "react-router-dom";
import {Course} from "../types/types.ts";
import {useEffect, useState} from "react";
import axios from "axios";

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
            {course ?
            <>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
            </>
            :
            <p>No course found.</p>}
            <Link to={"/"}>Back</Link>
        </>
    )
}