import {Course} from "../../../types/courseTypes.ts";
import CourseEntry from "../CourseEntry.tsx";
import {List} from "@mui/material";
import {useCourses} from "../../../hooks/useCourses.ts";
import DataStateHandler from "../../Shared/DataStateHandler.tsx";

type CourseListProps = {
    courses?: Course[]
    updateUser: (courseId: string, isAdded: boolean) => void,
}

export default function CourseList({courses, updateUser}: Readonly<CourseListProps>) {
    const {courses: allCourses, loading, error, updateCourse, deleteCourse} = useCourses();

    if (!courses) {
        courses = allCourses;
    }

    return (
        <DataStateHandler loading={loading} error={error} height={'100px'}>
            <List>
                {courses.map((course) => (
                    <CourseEntry key={course.id} course={course} deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>
                ))}
            </List>
        </DataStateHandler>
    )
}