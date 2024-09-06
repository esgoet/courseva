import {Course} from "../../types/courseTypes.ts";
import CourseEntry from "./CourseEntry.tsx";

type CourseListProps = {
    courses: Course[],
    deleteCourse: (courseId: string) => void,
    updateUser: (updatedProperty: string, updatedValue: string[]) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
}

export default function CourseList({courses, deleteCourse, updateUser, updateCourse}: Readonly<CourseListProps>) {

    return (
        <section>
            <h2>Courses</h2>
            <ul>
                {courses.map((course) => (
                  <CourseEntry key={course.id} course={course} deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>
                ))}
            </ul>
        </section>
    )
}