import {Grid2} from "@mui/material";
import EditableUserList from "../../../components/Shared/EditableUserList.tsx";
import {Instructor, Student} from "../../../types/userTypes.ts";
import {useCourse} from "../../../hooks/useCourse.ts";

type ParticipantOverviewProps = {
    students: Student[],
    instructors: Instructor[],
    updateCourse: (updatedProperty: string, updatedValue: string | string[]) => void,
};

export default function ParticipantOverview({students, instructors, updateCourse}: Readonly<ParticipantOverviewProps>) {
    const {course} = useCourse();
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <h3>Participants</h3>
            </Grid2>
            <Grid2 size={{xs:12, sm:6}}>
                <EditableUserList label={"Students"} name={"students"} initialValue={course?.students || []}
                                  updateCourse={updateCourse} options={students}/>
            </Grid2>
            <Grid2 size={{xs: 12, sm: 6}}>
                <EditableUserList label={"Instructors"} name={"instructors"} initialValue={course?.instructors || []}
                                  updateCourse={updateCourse} options={instructors}/>
            </Grid2>
        </Grid2>
    );
};