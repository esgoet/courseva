import {Link, useParams} from "react-router-dom";
import {Assignment, AssignmentDto, SubmissionDto} from "../../../types/courseTypes.ts";
import {FormEvent, useEffect, useRef, useState} from "react";
import {Button, Grid2, IconButton, Paper, Typography} from "@mui/material";
import {formatDate} from "../../../utils/formatDate.ts";
import {useCourse} from "../../../hooks/useCourse.ts";
import {RichTextEditorRef, RichTextReadOnly} from "mui-tiptap";
import useExtensions from "../../../hooks/useExtensions.ts";
import {convertToAssignmentDto, convertToAssignmentDtoList} from "../../../utils/convertToAssignmentDto.ts";
import FeedbackForm from "../../../components/Submission/FeedbackForm.tsx";
import {useAuth} from "../../../hooks/useAuth.ts";
import GradeSlider from "../../../components/Shared/GradeSlider.tsx";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import axiosInstance from "../../../api/axiosInstance.ts";

type SubmissionPageProps = {
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void;
}

export default function SubmissionPage({updateCourse}:Readonly<SubmissionPageProps>) {
    const {submissionId, assignmentId} = useParams();
    const {course} = useCourse();
    const {isInstructor} = useAuth();
    const [submission, setSubmission] = useState<SubmissionDto | undefined>();
    const [assignment, setAssignment] = useState<AssignmentDto | undefined>();
    const extensions = useExtensions();
    const rteRef = useRef<RichTextEditorRef>(null);
    const [editable, setEditable] = useState<boolean>(false);

    useEffect(()=> {
        if (course) {
            const currentAssignment : Assignment | undefined = course.assignments.find(assignment => assignment.id === assignmentId);
            if (currentAssignment) {
                setAssignment(convertToAssignmentDto(currentAssignment));
                const currentSubmission = currentAssignment.submissions.find(submission => submission.id === submissionId)
                if (currentSubmission) setSubmission({...currentSubmission, timestamp: currentSubmission.timestamp.toISOString().substring(0,19)})
            }
        }
    },[course, assignmentId, submissionId]);


    const handleFeedbackSubmission = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submission && assignment && course) {
            const updatedSubmissions : SubmissionDto[] = assignment.submissions.map(el => el.id === submissionId ?  {...submission, feedback: rteRef.current?.editor?.getHTML().toString()} : el);
            const updatedAssignment = {...assignment,submissions: updatedSubmissions};
            setAssignment(updatedAssignment);
            updateCourse("assignments", convertToAssignmentDtoList(course.assignments)
                .map(assignment => assignment.id === assignmentId ? updatedAssignment : assignment));
            setEditable(false);

            axiosInstance.put(`/api/students/${submission.studentId}/grades`, {
                [course.id]: {
                    assignmentId: assignmentId,
                    grade: submission.grade
                }
            })
        }
    }

    return (
        <>
            <Button component={Link} to={"../.."} relative={"path"} variant={'outlined'}>Back to Assignment</Button>
            {submission &&
                <>
                    <h3>Submission</h3>
                    <Grid2 container spacing={2}>

                        <Grid2 size={{xs: 12, sm: 6}}>
                            <Typography variant={"body2"} color={"secondary"}>
                                Student ID
                            </Typography>
                            <Typography variant={"body2"}>
                                {submission.studentId}
                            </Typography>
                        </Grid2>
                        <Grid2 size={{xs: 12, sm: 6}} sx={{textAlign: {xs: 'left', sm: 'right'}}}>
                            <Typography variant={"body2"} color={"secondary"}>
                                Submitted On
                            </Typography>
                            <Typography variant={"body2"} >
                                {formatDate(submission.timestamp).toUTCString()}
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Grid2 container justifyContent={'space-between'} alignItems={"center"}>
                                <h4>Feedback</h4>
                                {isInstructor && submission.feedback &&
                                    <IconButton
                                        onClick={() => setEditable(!editable)}
                                        color={"secondary"}
                                    >
                                        {editable ? <CancelIcon fontSize={"small"}/> : <EditIcon fontSize={"small"}/>}
                                    </IconButton>
                                }
                            </Grid2>
                            {isInstructor && !submission.feedback || isInstructor && editable ?
                                <FeedbackForm handleSubmit={handleFeedbackSubmission} submission={submission} setSubmission={setSubmission} ref={rteRef}/>
                                :
                                <>
                                    <Paper elevation={10} sx={{p: '15px', mb: 2}}>
                                        <RichTextReadOnly content={submission.feedback} extensions={extensions}/>
                                    </Paper>
                                    {(submission.grade || submission.grade === 0) &&
                                    <GradeSlider submission={submission} setSubmission={setSubmission} disabled={true}/>
                                    }
                                </>
                            }
                        </Grid2>
                        <Grid2 size={12}>
                            <h4>Submission Content</h4>
                            <Paper elevation={10} sx={{p: '15px'}}>
                                <RichTextReadOnly content={submission.content} extensions={extensions}/>
                            </Paper>
                        </Grid2>
                    </Grid2>
                </>
            }
        </>
    )
}