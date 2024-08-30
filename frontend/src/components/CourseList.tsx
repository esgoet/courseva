import {Course} from "../types/types.ts";
import CourseEntry from "./CourseEntry.tsx";

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
                  <CourseEntry key={course.id} course={course} deleteCourse={deleteCourse}/>
                ))}
            </ul>
        </section>
    )
}