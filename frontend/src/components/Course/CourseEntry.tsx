import {useNavigate} from "react-router-dom";
import {Course} from "../../types/courseTypes.ts";
import {Divider, ListItem, ListItemButton, ListItemText} from "@mui/material";
import CourseActions from "./CourseActions.tsx";

type CourseEntryProps = {
    course: Course
}

export default function CourseEntry({course}: Readonly<CourseEntryProps>) {
    const navigate = useNavigate();

    return (
        <>
            <ListItem
                sx={{bgcolor:'background.paper'}}
                secondaryAction={<CourseActions course={course} />}
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