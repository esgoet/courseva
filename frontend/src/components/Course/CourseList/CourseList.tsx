import {Course} from "../../../types/courseTypes.ts";
import CourseEntry from "../CourseEntry.tsx";
import {List} from "@mui/material";
import {useCourses} from "../../../hooks/useCourses.ts";
import DataStateHandler from "../../Shared/DataStateHandler.tsx";

type CourseListProps = {
    courses?: Course[]
}

export default function CourseList({courses}: Readonly<CourseListProps>) {
    const {courses: allCourses, loading, error} = useCourses();

    if (!courses) {
        courses = allCourses;
    }

    return (
        <DataStateHandler loading={loading} error={error} height={'100px'}>
            <List>
                {courses.map((course) => (
                    <CourseEntry key={course.id} course={course} />
                ))}
            </List>
        </DataStateHandler>
    )
}