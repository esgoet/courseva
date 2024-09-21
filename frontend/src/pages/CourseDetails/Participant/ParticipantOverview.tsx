import {Grid2} from "@mui/material";
import EditableUserList from "../../../components/Shared/EditableUserList.tsx";
import {Instructor, Student} from "../../../types/userTypes.ts";
import {useCurrentCourse} from "../../../hooks/useCurrentCourse.ts";
import {useDataArray} from "../../../hooks/useDataArray.ts";

export default function ParticipantOverview() {
    const {course} = useCurrentCourse();
    const students = useDataArray<Student>('/api/students');
    const instructors = useDataArray<Instructor>('/api/instructors');

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <h3>Participants</h3>
            </Grid2>
            <Grid2 size={{xs:12, sm:6}}>
                <EditableUserList label={"Students"} name={"students"} initialValue={course?.students || []}
                                   options={students}/>
            </Grid2>
            <Grid2 size={{xs: 12, sm: 6}}>
                <EditableUserList label={"Instructors"} name={"instructors"} initialValue={course?.instructors || []}
                                   options={instructors}/>
            </Grid2>
        </Grid2>
    );
};