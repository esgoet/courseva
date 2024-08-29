import {Assignment, AssignmentDto} from "../types/types.ts";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {convertToAssignmentDto} from "../utils/convertToAssignmentDto.ts";
import {convertToAssignmentDtoList} from "../utils/convertToAssignmentDto.ts";
import EditableTextDetail from "./EditableTextDetail.tsx";

type CourseAssignmentProps = {
    assignments: Assignment[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void
}
export default function CourseAssignment({assignments, updateCourse}: CourseAssignmentProps) {
    const [assignment, setAssignment] = useState<AssignmentDto|undefined>();
    const {assignmentId} = useParams();

    useEffect(()=> {
        if (assignments) {
            const currentAssignment : Assignment | undefined = assignments.find(assignment => assignment.id === assignmentId);
            if (currentAssignment) setAssignment(convertToAssignmentDto(currentAssignment))
        }
    },[assignments, assignmentId])

    const handleUpdate = (updatedProperty: string, updatedValue: string) => {
        if (assignment && assignments) {
            const updatedAssignment = {...assignment,[updatedProperty]: updatedValue};
            setAssignment(updatedAssignment);
            updateCourse("assignments", convertToAssignmentDtoList(assignments)
                .map(assignment => assignment.id === assignmentId ? updatedAssignment : assignment));
        }
    }



    return (
        <>
            {assignment &&
                <>
                    <h3>
                        <EditableTextDetail inputType={"text"} label={"Assignment Title"} name={"title"}
                                            initialValue={assignment.title} updateCourse={handleUpdate}/>
                    </h3>
                    <EditableTextDetail inputType={"datetime-local"} label={"Assignment Release"} name={"whenPublic"}
                                        initialValue={assignment.whenPublic} updateCourse={handleUpdate}/>
                    <EditableTextDetail inputType={"datetime-local"} label={"Assignment Deadline"} name={"deadline"}
                                        initialValue={assignment.deadline} updateCourse={handleUpdate}/>
                    <EditableTextDetail inputType={"textarea"} label={"Assignment Content"} name={"content"}
                                        initialValue={assignment.description} updateCourse={handleUpdate}/>

                    <h4>Submissions</h4>
                    {assignment.submissions.length > 0 ?
                        <ul>
                            {assignment.submissions.map(submission => (
                                <Link to={`${submission.id}`}>
                                    <p>{submission.studentId}</p>
                                    <p>{submission.timestamp}</p>
                                </Link>
                            ))}
                        </ul>
                        :
                        <p>No submissions yet.</p>
                    }

                </>
            }
        </>
    )
}