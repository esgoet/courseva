import {Course} from "../../types/courseTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import ConfirmDialog from "../Shared/ConfirmDialog.tsx";
import {useState} from "react";

type JoinOrLeaveCourseProps = {
    course: Course,
    updateUser: (updatedProperty: string, updatedValue: string[]) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
};

export default function JoinOrLeaveCourse({course, updateUser, updateCourse}: Readonly<JoinOrLeaveCourseProps>) {
    const {user, isInstructor} = useAuth();
    const [confirmLeave, setConfirmLeave] = useState<boolean>(false);
    const handleJoin = () => {
        if (user) {
            updateUser("courses", [...user.courses, course.id]);
            updateCourse(isInstructor ? "instructors" : "students", [...(isInstructor ? course.instructors : course.students), user.id], course);
        }
    }

    const handleLeave = () => {
        if (user) {
            updateUser("courses", user.courses.filter(userCourse => userCourse !== course.id));
            updateCourse(isInstructor ? "instructors" : "students", (isInstructor ? course.instructors.filter(instructor => instructor !== user.id) : course.students.filter(student => student !== user.id)), course);
        }
    }

    return (
        <>
            {user && !course.students.includes(user.id) && !course.instructors.includes(user.id) ?
                <button onClick={handleJoin}>Join Course</button>
                :
                <>
                    <button onClick={() => setConfirmLeave(true)}>Leave Course</button>
                    <ConfirmDialog toConfirmId={course.id} toConfirmName={course.title} modal={confirmLeave} closeModal={() => setConfirmLeave(false)} toConfirmFunction={handleLeave} toConfirmAction={"leave"}/>
                </>
}
</>
)
    ;
};