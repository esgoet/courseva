import {Course} from "../../types/courseTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import ConfirmDialog from "../Shared/ConfirmDialog.tsx";
import {useState} from "react";
import {Button} from "@mui/material";
import {useUsers} from "../../hooks/useUsers.ts";
import {useCourses} from "../../hooks/useCourses.ts";

type JoinOrLeaveCourseProps = {
    course: Course
};

export default function JoinOrLeaveCourse({course}: Readonly<JoinOrLeaveCourseProps>) {
    const {user} = useAuth();
    const [confirmLeave, setConfirmLeave] = useState<boolean>(false);
    const {updateUserCourses} = useUsers();
    const {updateCourse} = useCourses();

    const handleJoin = () => {
        if (user) {
            updateUserCourses(course.id, true);
            updateCourse(user?.instructor ? "instructors" : "students", user.instructor ? [...course.instructors, user.instructor.id] : user.student ? [...course.students, user.student.id] : [], course);
        }
    }

    const handleLeave = () => {
        if (user) {
            updateUserCourses(course.id, false);
            updateCourse(user?.instructor ? "instructors" : "students", (user?.instructor ? course.instructors.filter(instructor => instructor !== user.instructor?.id) : course.students.filter(student => student !== user.student?.id)), course);
        }
    }

    return (
        <>
            {user?.student && !course.students.includes(user.student.id) || user?.instructor && !course.instructors.includes(user.instructor.id) ?
                <Button onClick={handleJoin} variant={'outlined'} color={'secondary'}>Join Course</Button>
                :
                <>
                    <Button onClick={() => setConfirmLeave(true)} variant={'outlined'} color={'secondary'}>Leave</Button>
                    <ConfirmDialog toConfirmId={course.id} toConfirmName={course.title} modal={confirmLeave} closeModal={() => setConfirmLeave(false)} toConfirmFunction={handleLeave} toConfirmAction={"leave"}/>
                </>
}
</>
)
    ;
};