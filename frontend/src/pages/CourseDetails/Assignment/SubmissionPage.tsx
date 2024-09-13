import {Link, useParams} from "react-router-dom";
import {Assignment, AssignmentDto, SubmissionDto} from "../../../types/courseTypes.ts";
import {FormEvent, useEffect, useRef, useState} from "react";
import {Button, Grid2, Paper, Slider, Typography} from "@mui/material";
import {formatDate} from "../../../utils/formatDate.ts";
import {useCourse} from "../../../hooks/useCourse.ts";
import {RichTextEditorRef, RichTextReadOnly} from "mui-tiptap";
import useExtensions from "../../../hooks/useExtensions.ts";
import CustomRichTextEditor from "../../../components/Shared/CustomRichTextEditor.tsx";
import {convertToAssignmentDto, convertToAssignmentDtoList} from "../../../utils/convertToAssignmentDto.ts";

type SubmissionPageProps = {
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void;
}

export default function SubmissionPage({updateCourse}:Readonly<SubmissionPageProps>) {
    const {submissionId, assignmentId} = useParams();
    const {course} = useCourse();
    const [submission, setSubmission] = useState<SubmissionDto | undefined>();
    const [assignment, setAssignment] = useState<AssignmentDto | undefined>();
    const extensions = useExtensions();
    const rteRef = useRef<RichTextEditorRef>(null);

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
            const updatedSubmissions : SubmissionDto[] = [...assignment.submissions, {...submission, feedback: rteRef.current?.editor?.getHTML().toString()}];
            const updatedAssignment = {...assignment,submissions: updatedSubmissions};
            setAssignment(updatedAssignment);
            updateCourse("assignments", convertToAssignmentDtoList(course.assignments)
                .map(assignment => assignment.id === assignmentId ? updatedAssignment : assignment));
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
                        <Grid2>
                            <h4>Feedback</h4>
                            <form onSubmit={handleFeedbackSubmission}>
                                <CustomRichTextEditor initialValue={submission.feedback ?? ""} ref={rteRef}/>
                                <p>Grade: {submission.grade} ({submission.grade && submission.grade > 40 ? "Pass":"Fail"})</p>
                                <Slider
                                    value={submission.grade ?? 0}
                                    marks={[{value: 0, label: "0"},{value: 40, label: "40"},{value: 70, label: "70"},{value: 100, label:"100"}]}
                                    min={0}
                                    max={100}
                                    onChange={(e)=>setSubmission({...submission, grade: e.target.value})}
                                    valueLabelDisplay="on"
                                />
                                <Button type={"submit"}>Submit Feedback</Button>
                            </form>
                        </Grid2>
                        <Grid2 size={12}>
                            <h4>Submission Content</h4>
                            <Paper elevation={10} sx={{p: '20px'}}>
                                <RichTextReadOnly content={submission.content} extensions={extensions}/>
                            </Paper>
                        </Grid2>
                    </Grid2>
                </>
            }
        </>
    )
}