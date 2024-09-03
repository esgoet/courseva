import {Assignment, AssignmentDto} from "../types/courseTypes.ts";

export function convertToAssignmentDto(assignment: Assignment): AssignmentDto {
    return {
        ...assignment,
        whenPublic: assignment.whenPublic.toISOString().substring(0,19),
        deadline: assignment.deadline.toISOString().substring(0,19),
        submissions: assignment.submissions.map(submission => ({
            ...submission,
            timestamp: submission.timestamp.toISOString().substring(0,19)
        }))
    }
}

export function convertToAssignmentDtoList(assignments: Assignment[]): AssignmentDto[] {
    return assignments.map(assignment => ({
        ...assignment,
        whenPublic: assignment.whenPublic.toISOString().substring(0,19),
        deadline: assignment.deadline.toISOString().substring(0,19),
        submissions: assignment.submissions.map(submission => ({
            ...submission,
            timestamp: submission.timestamp.toISOString().substring(0,19)
        }))
    }))
}