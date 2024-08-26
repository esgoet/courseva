import {Course} from "../types/types.ts";

type CourseListProps = {
    courses: Course[]
}

export default function CourseList({courses}: CourseListProps) {
    return (
        <section>
            <h2>Courses</h2>
            {courses.map((course) => (
                <article>
                    <h3>{course.name}</h3>
                    <p>{course.description}</p>
                </article>
            ))}
        </section>
    )
}