import {Grid2, Typography} from "@mui/material";
import EditableUserList from "../../../components/Shared/EditableUserList.tsx";
import {useCurrentCourse} from "../../../hooks/useCurrentCourse.ts";
import {useUsers} from "../../../hooks/useUsers.ts";

export default function ParticipantOverview() {
    const {course} = useCurrentCourse();
    const {students, instructors} = useUsers();

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <Typography variant={"h3"}>Participants</Typography>
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