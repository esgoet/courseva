import {useNavigate} from "react-router-dom";
import {Course} from "../../types/courseTypes.ts";
import { ListItem, ListItemButton, ListItemText} from "@mui/material";
import CourseActions from "./CourseActions.tsx";

type CourseEntryProps = {
    course: Course,
    deleteCourse: (id: string) => void,
    updateUser: (updatedProperty: string, updatedValue: string[]) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
}

export default function CourseEntry({course, deleteCourse, updateUser, updateCourse}: Readonly<CourseEntryProps>) {
    const navigate = useNavigate();

    return (
        <ListItem
            sx={{bgcolor:'background.paper'}}
            secondaryAction={<CourseActions course={course} deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>}
            disablePadding
        >
            <ListItemButton onClick={()=>navigate(`/course/${course.id}`)} disableRipple>
                <ListItemText primary={<h3>{course.title}</h3>} secondary={course.id}/>

            </ListItemButton>
        </ListItem>
    )
}