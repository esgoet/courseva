import {Course} from "../types/types.ts";
import {Link} from "react-router-dom";

type CourseListProps = {
    courses: Course[]
}

export default function CourseList({courses}: Readonly<CourseListProps>) {
    return (
        <section>
            <h2>Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <h3>{course.title}</h3>
                        <p>{course.id}</p>
                        <Link to={`/course/${course.id}`}>Details</Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}