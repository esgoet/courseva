import {Assignment, AssignmentDto} from "../../../types/courseTypes.ts";
import {Link} from "react-router-dom";
import {convertToAssignmentDtoList} from "../../../utils/convertToAssignmentDto.ts";
import {useAuth} from "../../../hooks/useAuth.ts";
import {Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ConfirmedDeleteIconButton from "../../../components/Shared/ConfirmedDeleteIconButton.tsx";

type AssignmentOverviewProps = {
    assignments: Assignment[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void;
}

export default function AssignmentOverview({assignments, updateCourse}: Readonly<AssignmentOverviewProps>) {
    const {isInstructor} = useAuth();

    const deleteAssignment = (assignmentId: string) => {
        if (assignments) {
            updateCourse("assignments",
                convertToAssignmentDtoList(assignments.filter(assignment => assignment.id !== assignmentId)))
        }
    }

    return (
        <>
            <h3>Assignments</h3>
            {isInstructor &&
                <Button
                    component={Link} to={"create"}
                    color={"secondary"}
                    startIcon={<AddIcon/>}
                    variant={"outlined"}
                >Create</Button>}
            <List>
                {assignments?.filter(assignment => isInstructor ? assignment : assignment.whenPublic.valueOf() < Date.now()).toSorted((a, b) => a?.whenPublic.getTime() - b?.whenPublic.getTime()).map(assignment => (
                    <>
                        <ListItem
                            key={`assignment-${assignment.id}`}
                            secondaryAction={isInstructor &&
                                <ConfirmedDeleteIconButton toConfirmId={assignment.id} toConfirmName={assignment.title} toConfirmFunction={deleteAssignment}/>}
                            disablePadding
                        >
                            <ListItemButton
                                component={Link}
                                to={`${assignment.id}`}
                            >
                                <ListItemText primary={assignment.title} secondary={assignment.whenPublic.valueOf() > Date.now() && "Unpublished"}/>
                                <ListItemIcon sx={{display: 'flex', justifyContent: 'flex-end', pr: '5px'}}>
                                    <PendingActionsIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`${assignment.deadline.toDateString()}`} secondary={assignment.deadline.toLocaleTimeString()}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </>
                ))}
            </List>
        </>
    )
}