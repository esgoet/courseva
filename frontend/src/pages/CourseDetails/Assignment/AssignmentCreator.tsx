import {Assignment, AssignmentDto} from "../../../types/courseTypes.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {convertToAssignmentDtoList} from "../../../utils/convertToAssignmentDto.ts";

type AssignmentCreatorProps = {
    updateCourse: (updatedProperty: string, updatedValue: AssignmentDto[]) => void,
    assignments: Assignment[] | undefined
}

export default function AssignmentCreator({assignments, updateCourse}: Readonly<AssignmentCreatorProps>) {
    const [assignment, setAssignment] = useState<AssignmentDto>({
        id: "",
        title: "",
        description: "",
        whenPublic: new Date(Date.now()).toISOString().substring(0,19),
        deadline: "",
        submissions: []
    })
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAssignment({...assignment,[e.target.name]: e.target.value})
    }
    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (assignments) updateCourse("assignments", [assignment,...convertToAssignmentDtoList(assignments)])
        navigate("..",{ relative: "path" });
    }

    return (
        <>
            <h4>Create New Assignment</h4>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Required Assignment Information</legend>
                    <label htmlFor={"title"}>Assignment Title</label>
                    <input type={"text"} name={"title"} value={assignment.title} onChange={handleChange}
                           placeholder={"Enter Assignment Title"} autoCapitalize={"on"} required aria-required/>
                    <label htmlFor={"whenPublic"}>Assignment Release</label>
                    <input type={"datetime-local"} name={"whenPublic"} value={assignment.whenPublic}
                           onChange={handleChange} required
                           aria-required/>
                    <label htmlFor={"deadline"}>Assignment Deadline</label>
                    <input type={"datetime-local"} name={"deadline"} value={assignment.deadline}
                           onChange={handleChange} required
                           aria-required/>
                </fieldset>
                <fieldset>
                    <legend>Optional</legend>
                    <label htmlFor={"content"}>Assignment Description</label>
                    <textarea name={"content"} value={assignment.description} onChange={handleChange}
                              placeholder={"Enter Assignment Content"} autoCapitalize={"on"}/>
                </fieldset>
                <button type={"reset"}
                        onClick={() => setAssignment({
                            id: "", title: "", description: "", whenPublic: new Date(Date.now()).toISOString().substring(0,19), deadline: "", submissions:[]
                        })}>Reset
                </button>
                <button type={"submit"}>Create Assignment</button>
            </form>
        </>
    )
}