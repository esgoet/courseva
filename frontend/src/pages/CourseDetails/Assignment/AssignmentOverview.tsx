import {Link} from "react-router-dom";
import {convertToAssignmentDtoList} from "../../../utils/convertToAssignmentDto.ts";
import {useAuth} from "../../../hooks/useAuth.ts";
import {
    Grid2,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme, Typography
} from "@mui/material";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ConfirmedDeleteIconButton from "../../../components/Shared/ConfirmedDeleteIconButton.tsx";
import {useCurrentCourse} from "../../../hooks/useCurrentCourse.ts";
import GradeDisplay from "../../../components/Shared/GradeDisplay.tsx";
import {Grade, Student} from "../../../types/userTypes.ts";
import {useCourses} from "../../../hooks/useCourses.ts";
import CreateButton from "../../../components/Shared/CreateButton.tsx";


export default function AssignmentOverview() {
    const {user} = useAuth();
    const {course} = useCurrentCourse();
    const {updateCourse} = useCourses();
    const theme = useTheme();
    const isMobile = !(useMediaQuery(theme.breakpoints.up('sm')));

    const deleteAssignment = (assignmentId: string) => {
        if (course) {
            updateCourse("assignments",
                convertToAssignmentDtoList(course.assignments.filter(assignment => assignment.id !== assignmentId)))
        }
    }

    const getStudentGrade = (student: Student, assignmentId: string, courseId: string): number | undefined => {
        return student.grades[courseId]?.find((grade : Grade) => grade.assignmentId === assignmentId)?.grade;
    }

    return (
        <>
            <Typography variant={"h3"}>Assignments</Typography>
            {user?.instructor && <CreateButton />}
            <List>
                {course?.assignments.filter(assignment => user?.instructor ? assignment : assignment.whenPublic.valueOf() < Date.now()).toSorted((a, b) => a?.whenPublic.getTime() - b?.whenPublic.getTime()).map(assignment => {
                    let grade : number | undefined;
                    if (user && user.student && course && getStudentGrade(user.student, assignment.id, course.id)) {
                        grade = getStudentGrade(user.student, assignment.id, course.id);
                    }
                    return (
                        <ListItem
                            key={`assignment-${assignment.id}`}
                            secondaryAction={user?.instructor &&
                                <ConfirmedDeleteIconButton toConfirmId={assignment.id} toConfirmName={assignment.title} toConfirmFunction={deleteAssignment}/>}
                            disablePadding
                            divider

                        >
                            <ListItemButton
                                component={Link}
                                to={`${assignment.id}`}
                            >
                                <Grid2 container direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{width: '100%'}}>
                                    <Grid2 size={{xs: 12, sm: 6}}>
                                        <ListItemText
                                            primary={assignment.title}
                                            secondary={assignment.whenPublic.valueOf() > Date.now() && "Unpublished"}
                                        />
                                    </Grid2>
                                    <Grid2 container direction={"row"} alignItems={"center"} size={{xs: 8, sm: 4}}>
                                        <ListItemIcon sx={{display: 'flex', pr: '5px', minWidth: 'auto'}}>
                                            <PendingActionsIcon fontSize={isMobile ? 'small' : 'medium'}/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`${assignment.deadline.toDateString()}`}
                                            secondary={assignment.deadline.toLocaleTimeString()}
                                            primaryTypographyProps={{fontSize: isMobile ? 'body2.fontSize' : 'body1.fontSize'}}
                                        />
                                    </Grid2>
                                    <Grid2 size={{xs: 4, sm: 2}} sx={{textAlign: 'right'}}>
                                        {grade &&
                                            <ListItemText
                                                primary={<GradeDisplay grade={grade}/>}
                                            />
                                        }
                                    </Grid2>
                                </Grid2>
                            </ListItemButton>
                        </ListItem>
                    )
                }) }
            </List>
        </>
    )
}