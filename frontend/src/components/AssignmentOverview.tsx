import {Assignment, AssignmentDto} from "../types/courseTypes.ts";
import {Link} from "react-router-dom";
import {convertToAssignmentDtoList} from "../utils/convertToAssignmentDto.ts";
import {useContext} from "react";
import {AuthContext} from "./AuthContext.tsx";

type AssignmentOverviewProps = {
    assignments: Assignment[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void;
}

export default function AssignmentOverview({assignments, updateCourse}: Readonly<AssignmentOverviewProps>) {
    const {isInstructor} = useContext(AuthContext);

    const deleteAssignment = (assignmentId: string) => {
        if (assignments) {
            updateCourse("assignments",
                convertToAssignmentDtoList(assignments.filter(assignment => assignment.id !== assignmentId)))
        }
    }

    return (
        <>
            <h3>Assignments</h3>
            <Link to={"create"}>Create New Assignment</Link>
            <ul>
                {isInstructor ? assignments?.toSorted((a, b) => a?.whenPublic.getTime() - b?.whenPublic.getTime()).map(assignment => (
                    <li key={`assignment-${assignment.id}`}>
                        <Link to={`${assignment.id}`}>
                            <h4>{assignment.title}</h4>
                        </Link>
                        {assignment.whenPublic.valueOf() > Date.now() && <p>Unpublished</p>}
                        <button onClick={() => deleteAssignment(assignment.id)}>Delete</button>
                    </li>
                )) :
                    assignments?.filter(assignment => assignment.whenPublic.valueOf() < Date.now()).toSorted((a, b) => a?.whenPublic.getTime() - b?.whenPublic.getTime()).map(assignment => (
                        <li key={`assignment-${assignment.id}`}>
                            <Link to={`${assignment.id}`}>
                                <h4>{assignment.title}</h4>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}