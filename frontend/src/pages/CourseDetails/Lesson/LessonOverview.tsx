import {LessonDto} from "../../../types/courseTypes.ts";
import {Link} from "react-router-dom";
import { convertToLessonDtoList} from "../../../utils/convertToLessonDto.ts";
import {useAuth} from "../../../hooks/useAuth.ts";
import {Button, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConfirmedDeleteIconButton from "../../../components/Shared/ConfirmedDeleteIconButton.tsx";
import {useCourse} from "../../../hooks/useCourse.ts";


type LessonOverviewProps = {
    updateCourse: (updatedProperty: string, updatedValue: LessonDto[]) => void;
}

export default function LessonOverview({updateCourse}: Readonly<LessonOverviewProps>) {
    const {course} = useCourse();
    const {isInstructor} = useAuth();

    const deleteLesson = (lessonId: string) => {
        if (course) {
            updateCourse("lessons", convertToLessonDtoList(course.lessons.filter(lesson => lesson.id !== lessonId)))
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