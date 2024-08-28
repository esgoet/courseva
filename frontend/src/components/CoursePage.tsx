import {Link, useParams} from "react-router-dom";
import {Course} from "../types/types.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import EditableTextDetail from "./EditableTextDetail.tsx";
import EditableListDetail from "./EditableListDetail.tsx";

type CoursePageProps = {
    updateCourse: (course: Course, updatedProperty: string, updatedValue: string | string[]) => void
}

export default function CoursePage({updateCourse}: Readonly<CoursePageProps>) {
    const params = useParams();
    const id : string | undefined = params.id;

    const [course, setCourse] = useState<Course | undefined>();

    const fetchCourse = () => {
        axios.get(`/api/courses/${id}`)
            .then((response) => {
                setCourse(response.data)
            })
            .catch((error) => {
                console.log(error.response.data);
                setCourse(undefined);
            })
    }

    useEffect(() =>{
        fetchCourse()
    },[]);

    const handleUpdate = (updatedProperty: string, updatedValue: string | string[]) => {
        if (course) updateCourse(course, updatedProperty, updatedValue);
    }

    return (
        <>
            <Link to={"/"}>Back</Link>
            {course ?
            <>
                <h3>
                    <EditableTextDetail inputType={"text"} label={"Title"} name={"title"} initialValue={course.title} handleUpdate={handleUpdate}/>
                </h3>
                <p>{course.id}</p>
                <EditableTextDetail inputType={"textarea"} label={"Description"} name={"description"} initialValue={course.description} handleUpdate={handleUpdate}/>
                <EditableTextDetail inputType={"date"} label={"Start Date"} name={"startDate"} initialValue={course.startDate.toString()} handleUpdate={handleUpdate}/>
                {/*add lessons and assignments*/}
                <h3>Students</h3>
                <EditableListDetail label={"Students"} name={"students"} initialValue={course.students} handleUpdate={handleUpdate}/>
                <h3>Instructors</h3>
                <EditableListDetail label={"Instructors"} name={"instructors"} initialValue={course.instructors} handleUpdate={handleUpdate}/>
            </>
            :
            <p>No course found.</p>}
        </>
    )
}