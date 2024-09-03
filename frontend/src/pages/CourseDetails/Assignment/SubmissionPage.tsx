import {useParams} from "react-router-dom";
import {Assignment, SubmissionDto} from "../../../types/courseTypes.ts";
import {useEffect, useState} from "react";

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
            <h3>Submission</h3>
            <p>Student Id: {submission?.studentId}</p>
            <p>{submission?.timestamp}</p>
            <p>{submission?.content}</p>
        </>
    )
}