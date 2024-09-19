import {useNavigate} from "react-router-dom";
import {Course} from "../../types/courseTypes.ts";
import {Divider, ListItem, ListItemButton, ListItemText} from "@mui/material";
import CourseActions from "./CourseActions.tsx";

type CourseEntryProps = {
    course: Course,
    deleteCourse: (id: string) => void,
    updateUser: (courseId: string, isAdded: boolean) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
}

export default function CourseEntry({course, deleteCourse, updateUser, updateCourse}: Readonly<CourseEntryProps>) {
    const navigate = useNavigate();

    return (
        <>
            <ListItem
                sx={{bgcolor:'background.paper'}}
                secondaryAction={<CourseActions course={course} deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>}
                disablePadding
            >
                <ListItemButton onClick={()=>navigate(`/course/${course.id}`)} disableRipple>
                    <ListItemText primary={course.title} secondary={course.id} primaryTypographyProps={{variant:"button"}}/>

                </ListItemButton>
            </ListItem>
            <Divider/>
        </>

    )
}