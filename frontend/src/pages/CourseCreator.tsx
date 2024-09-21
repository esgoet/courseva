import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {NewCourseDto} from "../types/courseTypes.ts";
import {Link} from "react-router-dom";
import {
    Button,
    Grid2, InputLabel,
    TextField
} from "@mui/material";
import UserCheckList from "../components/Shared/UserCheckList.tsx";
import type {RichTextEditorRef} from "mui-tiptap";
import CustomRichTextEditor from "../components/Shared/CustomRichTextEditor.tsx";
import {useDataArray} from "../hooks/useDataArray.ts";
import {Instructor, Student} from "../types/userTypes.ts";
import {useCourses} from "../hooks/useCourses.ts";

export default function CourseCreator() {
    const [course, setCourse] = useState<NewCourseDto>({title:"", description:"", students:[], instructors:[], startDate: ""})
    const [courseStudents, setCourseStudents] = useState<string[]>([]);
    const [courseInstructors, setCourseInstructors] = useState<string[]>([]);
    const {createCourse} = useCourses();

    const students = useDataArray<Student>('/api/students');
    const instructors = useDataArray<Instructor>('/api/instructors');

    const rteRef = useRef<RichTextEditorRef>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCourse({...course,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCourse: NewCourseDto = {...course, students: courseStudents, instructors: courseInstructors, description: rteRef.current?.editor?.getHTML().toString() ?? ""};
        setCourse(newCourse);
        createCourse(newCourse);
    }

    return (
        <>
            <Button component={Link} to={"/"} variant={"outlined"}>Back to Dashboard</Button>
            <h2>Create a Course</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label={"Course Title"}
                    type={"text"}
                    name={"title"}
                    value={course.title}
                    onChange={handleChange}
                    autoCapitalize={"on"}
                    autoFocus
                    required
                    aria-required
                />
                <Grid2 size={12} id={"assignment-description"}>
                    <InputLabel shrink htmlFor={"assignment-description"} required aria-required>Course Description</InputLabel>
                    <CustomRichTextEditor initialValue={""} ref={rteRef} />
                </Grid2>
                <TextField
                    label={"Start Date"}
                    type={"date"}
                    name={"startDate"}
                    value={course.startDate}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    required
                    aria-required
                />
                <h3>Select Students (Optional)</h3>
                <UserCheckList editable={true} options={students} currentOptions={courseStudents}
                               setCurrentOptions={setCourseStudents}/>
                <h3>Select Instructors (Optional)</h3>
                <UserCheckList editable={true} options={instructors} currentOptions={courseInstructors}
                               setCurrentOptions={setCourseInstructors}/>
                <Grid2 container spacing={2}>
                    <Grid2 size={{xs: 12, sm: 6}}>
                        <Button type={"reset"} variant={'outlined'} fullWidth
                                onClick={() => setCourse({
                                    title: "",
                                    description: "",
                                    students: [],
                                    instructors: [],
                                    startDate: ""
                                })}>Reset
                        </Button>
                    </Grid2>
                    <Grid2 size={{xs: 12, sm: 6}}>
                        <Button type={"submit"} fullWidth variant={'outlined'} color={"secondary"}>Create
                            Course</Button>
                    </Grid2>
                </Grid2>
            </form>
        </>
    )
}