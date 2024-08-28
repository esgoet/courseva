import {Link, Outlet, useParams} from "react-router-dom";
import {Course} from "../types/types.ts";
import {Dispatch, SetStateAction, useEffect} from "react";
import axios from "axios";
import EditableTextDetail from "./EditableTextDetail.tsx";
import EditableListDetail from "./EditableListDetail.tsx";

type CoursePageProps = {
    updateCourse: (updatedProperty: string, updatedValue: string | string[]) => void,
    course: Course | undefined,
    setCourse: Dispatch<SetStateAction<Course | undefined>>
}

export default function CoursePage({updateCourse, course, setCourse}: Readonly<CoursePageProps>) {
    const params = useParams();
    const id : string | undefined = params.id;

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

    return (
        <>
            <Link to={"/"}>Back</Link>
            {course ?
            <>
                <h3>
                    <EditableTextDetail inputType={"text"} label={"Title"} name={"title"} initialValue={course.title} updateCourse={updateCourse}/>
                </h3>
                <p>{course.id}</p>
                <EditableTextDetail inputType={"textarea"} label={"Description"} name={"description"} initialValue={course.description} updateCourse={updateCourse}/>
                <EditableTextDetail inputType={"date"} label={"Start Date"} name={"startDate"} initialValue={course.startDate.toString()} updateCourse={updateCourse}/>
                {/*add lessons and assignments*/}
                <h3>Students</h3>
                <EditableListDetail label={"Students"} name={"students"} initialValue={course.students} updateCourse={updateCourse}/>
                <h3>Instructors</h3>
                <EditableListDetail label={"Instructors"} name={"instructors"} initialValue={course.instructors} updateCourse={updateCourse}/>
                <Outlet/>
            </>
            :
            <p>No course found.</p>}
        </>
    )
}