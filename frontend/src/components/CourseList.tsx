import {Course} from "../types/types.ts";
import {Link} from "react-router-dom";

type CourseListProps = {
    courses: Course[],
    deleteCourse: (courseId: string) => void
}

export default function CourseList({courses, deleteCourse}: Readonly<CourseListProps>) {
    return (
        <section>
            <h2>Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <h3>{course.title}</h3>
                        <p>{course.id}</p>
                        <Link to={`/course/${course.id}`}>Details</Link>
                        <button onClick={()=>deleteCourse(course.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}