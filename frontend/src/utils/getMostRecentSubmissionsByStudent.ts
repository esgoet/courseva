import {Submission, SubmissionDto} from "../types/courseTypes";

export function getMostRecentSubmissionsByStudent(submissions: (SubmissionDto | Submission)[]) : (SubmissionDto | Submission)[] {
    const mostRecent = submissions.reduce((acc, submission) => {
        const { studentId, timestamp } = submission;

        // If no entry for the studentId or if the current timestamp is more recent, update the entry
        if (
            !acc[studentId] ||
            new Date(timestamp) > new Date(acc[studentId].timestamp)
        ) {
            acc[studentId] = submission;
        }

        return acc;
    }, {} as { [studentId: string]: SubmissionDto | Submission });

    // Return the filtered submissions as an array
    return Object.values(mostRecent);
}