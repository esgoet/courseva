import {Assignment, AssignmentDto} from "../types/courseTypes.ts";

export function convertToAssignmentDto(assignment: Assignment): AssignmentDto {
    return {
        ...assignment,
        whenPublic: assignment.whenPublic.toString(),
        deadline: assignment.deadline.toString(),
        submissions: assignment.submissions.map(submission => ({
            ...submission,
            timestamp: submission.timestamp.toString()
        }))
    }
}

export function convertToAssignmentDtoList(assignments: Assignment[]): AssignmentDto[] {
    return assignments.map(assignment => ({
        ...assignment,
        whenPublic: assignment.whenPublic.toString(),
        deadline: assignment.deadline.toString(),
        submissions: assignment.submissions.map(submission => ({
            ...submission,
            timestamp: submission.timestamp.toString()
        }))
    }))
}