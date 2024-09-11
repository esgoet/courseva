import {Assignment, AssignmentDto, SubmissionDto} from "../../../types/courseTypes.ts";
import {FormEvent, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {convertToAssignmentDto, convertToAssignmentDtoList} from "../../../utils/convertToAssignmentDto.ts";
import EditableTextDetail from "../../../components/Shared/EditableTextDetail.tsx";
import { useAuth } from "../../../hooks/useAuth.ts";
import {Button, List, ListItem, ListItemButton, ListItemText} from "@mui/material";

type AssignmentPageProps = {
    assignments: Assignment[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void
}
export default function AssignmentPage({assignments, updateCourse}: Readonly<AssignmentPageProps>) {
    const [assignment, setAssignment] = useState<AssignmentDto|undefined>();
    const {assignmentId} = useParams();
    const [submission, setSubmission] = useState<SubmissionDto>({
        id: "",
        studentId: "",
        content: "",
        timestamp: ""
    });
    const {user, isInstructor} = useAuth();

    useEffect(()=> {
        if (assignments) {
            const currentAssignment : Assignment | undefined = assignments.find(assignment => assignment.id === assignmentId);
            if (currentAssignment) setAssignment(convertToAssignmentDto(currentAssignment))
        }
    },[assignments, assignmentId])

    const handleUpdate = (updatedProperty: string, updatedValue: string | SubmissionDto[]) => {
        if (assignment && assignments) {
            const updatedAssignment = {...assignment,[updatedProperty]: updatedValue};
            setAssignment(updatedAssignment);
            updateCourse("assignments", convertToAssignmentDtoList(assignments)
                .map(assignment => assignment.id === assignmentId ? updatedAssignment : assignment));
        }
    }

    const handleStudentSubmission = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (assignment && user) {
            const updatedSubmissions : SubmissionDto[] = [...assignment.submissions, {...submission, timestamp: new Date(Date.now()).toISOString().substring(0,19), studentId: user.id}];
            handleUpdate("submissions", updatedSubmissions);
        }
    }



    return (
        <>
            <Button component={Link} to={".."} relative={"path"} variant={'outlined'}>Back to All Assignments</Button>
            {assignment &&
                <>
                    <h3>
                        <EditableTextDetail inputType={"text"} label={"Assignment Title"} name={"title"}
                                            initialValue={assignment.title} updateFunction={handleUpdate} allowedToEdit={isInstructor}/>
                    </h3>
                    <EditableTextDetail inputType={"datetime-local"} label={"Release"} name={"whenPublic"}
                                        initialValue={assignment.whenPublic} updateFunction={handleUpdate} allowedToEdit={isInstructor}/>
                    <EditableTextDetail inputType={"datetime-local"} label={"Deadline"} name={"deadline"}
                                        initialValue={assignment.deadline} updateFunction={handleUpdate} allowedToEdit={isInstructor}/>
                    <EditableTextDetail inputType={"textarea"} label={"Description"} name={"content"}
                                        initialValue={assignment.description} updateFunction={handleUpdate} allowedToEdit={isInstructor}/>
                    {!isInstructor && user &&
                        <>
                            {assignment.submissions.filter(submission => submission.studentId === user.id).length > 0 &&
                                <>
                                    <h4>Your Past Submissions</h4>
                                    <List dense >
                                        {assignment.submissions.filter(submission => submission.studentId === user.id).map(submission =>
                                            (
                                                <ListItem key={`submission-${submission.id}`} disablePadding>
                                                    <ListItemButton component={Link} to={`submission/${submission.id}`}>
                                                        <ListItemText primary={submission.studentId}
                                                                      secondary={submission.timestamp}/>
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </>
                            }
                            {new Date(assignment.deadline).valueOf() > Date.now() &&
                                <>
                                    <h4>Submit Your Assignment</h4>
                                    <form onSubmit={handleStudentSubmission}>
                                        <textarea name={"content"} value={submission.content}
                                          onChange={(e) => setSubmission({...submission, content: e.target.value})}/>
                                        <Button type={"submit"}>Submit</Button>
                                    </form>
                                </>
                            }
                        </>
                    }
                    {isInstructor &&
                        <>
                            <h4>Submissions</h4>
                            {assignment.submissions.length > 0 ?
                                <List dense>
                                    {assignment.submissions.map(submission => (
                                        <ListItem key={`submission-${submission.id}`} disablePadding>
                                            <ListItemButton component={Link} to={`submission/${submission.id}`}>
                                                <ListItemText primary={submission.studentId} secondary={submission.timestamp}/>
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                                :
                                <p>No submissions yet.</p>
                            }
                        </>
                    }
                </>
            }
        </>
    )
}