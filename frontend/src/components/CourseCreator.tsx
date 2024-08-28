import {ChangeEvent, FormEvent, useState} from "react";
import {NewCourseDto} from "../types/types.ts";
import {Link} from "react-router-dom";
import {PLACEHOLDERS} from "../utils/constants.ts";

type CourseCreatorProps = {
    createCourse: (course: NewCourseDto) => void;
}

export default function CourseCreator({createCourse}: Readonly<CourseCreatorProps>) {
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
                    <input type={"date"} name={"startDate"} value={course.startDate} onChange={handleChange} required aria-required/>
                </fieldset>
                <fieldset>
                    <legend>Optional</legend>
                    <label htmlFor={"students"}>Students</label>
                    <select name={"students"} value={course.students} multiple onChange={handleMultipleSelect}>
                        {PLACEHOLDERS.map((student) => <option key={`student-${student.id}`} value={student.id}>{student.name}</option>)}
                    </select>
                    <label htmlFor={"instructors"}>Instructors</label>
                    <select name={"instructors"} value={course.instructors} multiple onChange={handleMultipleSelect}>
                        {PLACEHOLDERS.map((instructor) => <option key={`instructor-${instructor.id}`} value={instructor.id}>{instructor.name}</option>)}
                    </select>
                </fieldset>
                <button type={"reset"}
                        onClick={() => setCourse({title: "", description: "", students: [], instructors: [], startDate: ""})}>Reset
                </button>
                <button type={"submit"}>Create Course</button>
            </form>
        </>
    )
}