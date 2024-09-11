import {Link, useParams} from "react-router-dom";
import {Assignment, SubmissionDto} from "../../../types/courseTypes.ts";
import {useEffect, useState} from "react";
import {Button, Grid2, Typography} from "@mui/material";
import {formatDate} from "../../../utils/formatDate.ts";

type SubmissionPageProps = {
    assignments: Assignment[] | undefined
}

export default function SubmissionPage({assignments}: Readonly<SubmissionPageProps>) {
    const {submissionId, assignmentId} = useParams();
    const [submission, setSubmission] = useState<SubmissionDto | undefined>();

    useEffect(()=> {
        if (assignments) {
            const currentAssignment : Assignment | undefined = assignments.find(assignment => assignment.id === assignmentId);
            if (currentAssignment) {
                const currentSubmission = currentAssignment.submissions.find(submission => submission.id === submissionId)
                if (currentSubmission) setSubmission({...currentSubmission, timestamp: currentSubmission.timestamp.toString()})
            }
        }
    },[assignments, assignmentId, submissionId]);

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
                            {submission.content}
                        </Grid2>
                    </Grid2>
                </>
            }
        </>
    )
}