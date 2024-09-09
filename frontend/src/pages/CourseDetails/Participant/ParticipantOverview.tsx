import {Grid2} from "@mui/material";
import EditableListDetail from "../../../components/Shared/EditableListDetail.tsx";
import {Instructor, Student} from "../../../types/userTypes.ts";

type ParticipantOverviewProps = {
    currentStudents: string[],
    currentInstructors: string[],
    students: Student[],
    instructors: Instructor[],
    updateCourse: (updatedProperty: string, updatedValue: string | string[]) => void,
};

export default function ParticipantOverview({currentStudents, currentInstructors, students, instructors, updateCourse}: Readonly<ParticipantOverviewProps>) {
    return (
        <Grid2 container>
            <Grid2>
                <h3>Participants</h3>
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
                <h4>Students</h4>
                <EditableListDetail label={"Students"} name={"students"} initialValue={currentStudents}
                                    updateCourse={updateCourse} options={students}/>
            </Grid2>
            <Grid2 size={{xs: 12, md: 6}}>
                <h4>Instructors</h4>
                <EditableListDetail label={"Instructors"} name={"instructors"} initialValue={currentInstructors}
                                    updateCourse={updateCourse} options={instructors}/>
            </Grid2>
        </Grid2>
    );
};