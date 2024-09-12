import {Assignment, AssignmentDto, SubmissionDto} from "../../../types/courseTypes.ts";
import {FormEvent, useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {convertToAssignmentDto, convertToAssignmentDtoList} from "../../../utils/convertToAssignmentDto.ts";
import EditableTextDetail from "../../../components/Shared/EditableTextDetail.tsx";
import { useAuth } from "../../../hooks/useAuth.ts";
import {Button, List, ListItem, ListItemButton, ListItemText, Stack} from "@mui/material";
import {useCourse} from "../../../hooks/useCourse.ts";
import EditableRichText from "../../../components/Shared/EditableRichText.tsx";
import CustomRichTextEditor from "../../../components/Shared/CustomRichTextEditor.tsx";
import {RichTextEditorRef} from "mui-tiptap";

type AssignmentPageProps = {
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void
}
export default function AssignmentPage({updateCourse}: Readonly<AssignmentPageProps>) {
    const [assignment, setAssignment] = useState<AssignmentDto|undefined>();
    const {assignmentId} = useParams();
    const {course} = useCourse();
    const {user, isInstructor} = useAuth();
    const rteRef = useRef<RichTextEditorRef>(null);


    useEffect(()=> {
        if (course) {
            const currentAssignment : Assignment | undefined = course.assignments.find(assignment => assignment.id === assignmentId);
            if (currentAssignment) setAssignment(convertToAssignmentDto(currentAssignment))
        }
    },[course, assignmentId])

    const handleUpdate = (updatedProperty: string, updatedValue: string | SubmissionDto[]) => {
        if (assignment && course) {
            const updatedAssignment = {...assignment,[updatedProperty]: updatedValue};
            setAssignment(updatedAssignment);
            updateCourse("assignments", convertToAssignmentDtoList(course.assignments)
                .map(assignment => assignment.id === assignmentId ? updatedAssignment : assignment));
        }
    }

    const handleStudentSubmission = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (assignment && user) {
            const updatedSubmissions : SubmissionDto[] = [...assignment.submissions, {id: "", studentId: user.id, timestamp: new Date(Date.now()).toISOString().substring(0,19), content: rteRef.current?.editor?.getHTML().toString() || ""}];
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
                    <EditableRichText label={"Description"} name={"description"} initialValue={assignment.description} updateFunction={handleUpdate} allowedToEdit={isInstructor}/>
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
                                        <Stack>
                                            <CustomRichTextEditor initialValue={""} ref={rteRef}/>
                                            <Button type={"submit"}>Submit</Button>
                                        </Stack>
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