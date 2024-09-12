import {Link, useParams} from "react-router-dom";
import {Assignment, SubmissionDto} from "../../../types/courseTypes.ts";
import {useEffect, useState} from "react";
import {Button, Grid2, Typography} from "@mui/material";
import {formatDate} from "../../../utils/formatDate.ts";
import {useCourse} from "../../../hooks/useCourse.ts";
import {RichTextReadOnly} from "mui-tiptap";
import useExtensions from "../../../hooks/useExtensions.ts";

export default function SubmissionPage() {
    const {submissionId, assignmentId} = useParams();
    const {course} = useCourse();
    const [submission, setSubmission] = useState<SubmissionDto | undefined>();
    const extensions = useExtensions();

    useEffect(()=> {
        if (course) {
            const currentAssignment : Assignment | undefined = course.assignments.find(assignment => assignment.id === assignmentId);
            if (currentAssignment) {
                const currentSubmission = currentAssignment.submissions.find(submission => submission.id === submissionId)
                if (currentSubmission) setSubmission({...currentSubmission, timestamp: currentSubmission.timestamp.toString()})
            }
        }
    },[course, assignmentId, submissionId]);

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
                            <RichTextReadOnly content={submission.content} extensions={extensions}/>
                        </Grid2>
                    </Grid2>
                </>
            }
        </>
    )
}