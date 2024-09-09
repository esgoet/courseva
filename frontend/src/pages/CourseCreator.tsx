import {ChangeEvent, FormEvent, useState} from "react";
import {NewCourseDto} from "../types/courseTypes.ts";
import {Link} from "react-router-dom";
import {Instructor, Student} from "../types/userTypes.ts";
import {Button} from "@mui/material";

type CourseCreatorProps = {
    createCourse: (course: NewCourseDto) => void,
    students: Student[],
    instructors: Instructor[]
}

export default function CourseCreator({createCourse, students, instructors}: Readonly<CourseCreatorProps>) {
    const [course, setCourse] = useState<NewCourseDto>({title:"", description:"", students:[], instructors:[], startDate: ""})

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCourse({...course,[e.target.name]: e.target.value})
    }
    const handleMultipleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setCourse({...course,[e.target.name]: [...e.target.selectedOptions].map(option => option.value)})
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createCourse(course);
    }

    return (
        <>
            <Link to={"/"}>Back</Link>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Required Course Information</legend>
                    <label htmlFor={"title"}>Course Title</label>
                    <input type={"text"} name={"title"} value={course.title} onChange={handleChange}
                           placeholder={"Enter Course Title"} autoCapitalize={"on"} required aria-required/>
                    <label htmlFor={"description"}>Course Description</label>
                    <textarea name={"description"} value={course.description} onChange={handleChange}
                              placeholder={"Enter Course Description"} autoCapitalize={"on"} required aria-required/>
                    <label htmlFor={"startDate"}>Course Start Date</label>
                    <input type={"date"} name={"startDate"} value={course.startDate} onChange={handleChange} required aria-required/>
                </fieldset>
                <fieldset>
                    <legend>Optional</legend>
                    <label htmlFor={"students"}>Students</label>
                    <select name={"students"} value={course.students} multiple onChange={handleMultipleSelect}>
                        {students.map((student) => <option key={`student-${student.id}`} value={student.id}>{student.username}</option>)}
                    </select>
                    <label htmlFor={"instructors"}>Instructors</label>
                    <select name={"instructors"} value={course.instructors} multiple onChange={handleMultipleSelect}>
                        {instructors.map((instructor) => <option key={`instructor-${instructor.id}`} value={instructor.id}>{instructor.username}</option>)}
                    </select>
                </fieldset>
                <Button type={"reset"}
                        onClick={() => setCourse({title: "", description: "", students: [], instructors: [], startDate: ""})}>Reset
                </Button>
                <Button type={"submit"}>Create Course</Button>
            </form>
        </>
    )
}