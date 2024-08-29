import {Assignment, AssignmentDto} from "../types/types.ts";
import {Link} from "react-router-dom";
import {convertToAssignmentDtoList} from "../utils/convertToAssignmentDto.ts";

type CourseAssignmentOverviewProps = {
    assignments: Assignment[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void;
}

export default function CourseAssignmentOverview({assignments, updateCourse}:CourseAssignmentOverviewProps) {
    const deleteAssignment = (assignmentId: string) => {
        if (assignments) {
            updateCourse("lessons",
                convertToAssignmentDtoList(assignments.filter(assignment => assignment.id !== assignmentId)))
        }
    }

    return (
        <>
            <h3>Assignments</h3>
            <ul>
                {assignments?.filter(assignment => new Date(assignment.deadline).valueOf() < Date.now()).map(assignment => (
                    <li key={`lesson-${assignment.id}`}>
                        <Link to={`${assignment.id}`}>
                            <h4>{assignment.title}</h4>
                        </Link>
                        <button onClick={() => deleteAssignment(assignment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}