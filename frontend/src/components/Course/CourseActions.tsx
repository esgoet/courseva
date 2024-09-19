import JoinOrLeaveCourse from "./JoinOrLeaveCourse.tsx";
import {Course} from "../../types/courseTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import ConfirmedDeleteIconButton from "../Shared/ConfirmedDeleteIconButton.tsx";

type CourseActionsProps = {
    course: Course,
    deleteCourse: (id: string) => void,
    updateUser: (courseId: string, isAdded: boolean) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
};

export default function CourseActions({course, deleteCourse, updateUser, updateCourse}: Readonly<CourseActionsProps>) {
    const {isInstructor} = useAuth();

    return (
        <>
            <JoinOrLeaveCourse course={course} updateUser={updateUser} updateCourse={updateCourse}/>
            {isInstructor && <ConfirmedDeleteIconButton toConfirmId={course.id} toConfirmName={course.title} toConfirmFunction={deleteCourse}/>}
        </>
    );
};