import {Assignment, AssignmentDto, SubmissionDto} from "../../../types/courseTypes.ts";
import {FormEvent, useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {convertToAssignmentDto, convertToAssignmentDtoList} from "../../../utils/convertToAssignmentDto.ts";
import EditableTextDetail from "../../../components/Shared/EditableTextDetail.tsx";
import {AuthContext} from "../../../context/AuthContext.ts";

type AssignmentPageProps = {
    assignments: Assignment[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void
}
export default function AssignmentPage({assignments, updateCourse}: Readonly<AssignmentPageProps>) {
    const [assignment, setAssignment] = useState<AssignmentDto|undefined>();
    const {assignmentId} = useParams();
    const [submission, setSubmission] = useState<SubmissionDto>({
        id: "",
        studentId: "",
        content: "",
        timestamp: ""
    });
    const {user, isInstructor} = useContext(AuthContext);

    useEffect(()=> {
        if (assignments) {
            const currentAssignment : Assignment | undefined = assignments.find(assignment => assignment.id === assignmentId);
            if (currentAssignment) setAssignment(convertToAssignmentDto(currentAssignment))
        }
    },[assignments, assignmentId])

    const handleUpdate = (updatedProperty: string, updatedValue: string | SubmissionDto[]) => {
        if (assignment && assignments) {
            const updatedAssignment = {...assignment,[updatedProperty]: updatedValue};
            setAssignment(updatedAssignment);
            updateCourse("assignments", convertToAssignmentDtoList(assignments)
                .map(assignment => assignment.id === assignmentId ? updatedAssignment : assignment));
        }
    }

    const handleStudentSubmission = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (assignment) {
            const updatedSubmissions : SubmissionDto[] = [...assignment.submissions, {...submission, timestamp: new Date(Date.now()).toISOString().substring(0,19)}];
            handleUpdate("submissions", updatedSubmissions);
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
                    {!isInstructor && user &&
                        <>
                            <h4>Submit Your Assignment</h4>
                            <form onSubmit={handleStudentSubmission}>
                                <textarea name={"content"} value={submission.content} onChange={(e)=>setSubmission({...submission, content: e.target.value})}/>
                                <button>Submit</button>
                            </form>
                        </>
                    }
                    {isInstructor &&
                        <>
                            <h4>Submissions</h4>
                            {assignment.submissions.length > 0 ?
                                <ul>
                                    {assignment.submissions.map(submission => (
                                        <li key={`submission-${submission.id}`}>
                                            <Link to={`submission/${submission.id}`}>
                                                <p>{submission.studentId}</p>
                                                <p>{submission.timestamp}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <p>No submissions yet.</p>
                            }
                        </>
                    }
                </>
            }
        </>
    )
}