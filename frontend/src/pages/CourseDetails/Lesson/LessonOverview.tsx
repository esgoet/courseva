import {Link} from "react-router-dom";
import { convertToLessonDtoList} from "../../../utils/convertToLessonDto.ts";
import {useAuth} from "../../../hooks/useAuth.ts";
import {Button, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConfirmedDeleteIconButton from "../../../components/Shared/ConfirmedDeleteIconButton.tsx";
import {useCurrentCourse} from "../../../hooks/useCurrentCourse.ts";
import {useCourses} from "../../../hooks/useCourses.ts";

export default function LessonOverview() {
    const {course} = useCurrentCourse();
    const {isInstructor} = useAuth();
    const {updateCourse} = useCourses();

    const deleteLesson = (lessonId: string) => {
        if (course) {
            updateCourse("lessons", convertToLessonDtoList(course.lessons.filter(lesson => lesson.id !== lessonId)));
        }
    }
    return (
        <>
            <h3>Lessons</h3>
            {isInstructor &&
                <Button
                    component={Link} to={"create"}
                    color={"secondary"}
                    startIcon={<AddIcon/>}
                    variant={"outlined"}
                >Create</Button>}
            <List>
                {course?.lessons?.filter(lesson => isInstructor ? lesson : lesson.whenPublic.valueOf() < Date.now()).toSorted((a, b) => a?.whenPublic.getTime() - b?.whenPublic.getTime()).toSorted((a, b) => a?.whenPublic.getTime() - b?.whenPublic.getTime()).map(lesson=> (
                    <ListItem
                        key={`lesson-${lesson.id}`}
                        secondaryAction={isInstructor &&
                            <ConfirmedDeleteIconButton toConfirmId={lesson.id} toConfirmName={lesson.title} toConfirmFunction={deleteLesson}/>}
                        disablePadding
                        divider
                    >
                        <ListItemButton
                            component={Link}
                            to={`${lesson.id}`}
                        >
                            <ListItemText primary={lesson.title} secondary={lesson.whenPublic.valueOf() > Date.now() && "Unpublished"}/>
                        </ListItemButton>
                    </ListItem>
                )) 
                }
            </List>
        </>
    )
}