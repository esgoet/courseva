import {Course} from "../../types/courseTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import ConfirmDialog from "../Shared/ConfirmDialog.tsx";
import {useState} from "react";
import {Button} from "@mui/material";

type JoinOrLeaveCourseProps = {
    course: Course,
    updateUser: (courseId: string, isAdded: boolean) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
};

export default function JoinOrLeaveCourse({course, updateUser, updateCourse}: Readonly<JoinOrLeaveCourseProps>) {
    const {user, isInstructor} = useAuth();
    const [confirmLeave, setConfirmLeave] = useState<boolean>(false);
    const handleJoin = () => {
        if (user) {
            updateUser(course.id, true);
            updateCourse(isInstructor ? "instructors" : "students", [...(isInstructor ? course.instructors : course.students), user.id], course);
        }
    }

    const handleLeave = () => {
        if (user) {
            updateUser(course.id, false);
            updateCourse(isInstructor ? "instructors" : "students", (isInstructor ? course.instructors.filter(instructor => instructor !== user.instructor?.id) : course.students.filter(student => student !== user.student?.id)), course);
        }
    }

    return (
        <>
            {user && !course.students.includes(user.id) && !course.instructors.includes(user.id) ?
                <Button onClick={handleJoin}>Join Course</Button>
                :
                <>
                    <Button onClick={() => setConfirmLeave(true)}>Leave</Button>
                    <ConfirmDialog toConfirmId={course.id} toConfirmName={course.title} modal={confirmLeave} closeModal={() => setConfirmLeave(false)} toConfirmFunction={handleLeave} toConfirmAction={"leave"}/>
                </>
}
</>
)
    ;
};