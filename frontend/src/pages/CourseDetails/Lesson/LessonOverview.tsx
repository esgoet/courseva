import {Lesson, LessonDto} from "../../../types/courseTypes.ts";
import {Link} from "react-router-dom";
import { convertToLessonDtoList} from "../../../utils/convertToLessonDto.ts";
import {useAuth} from "../../../hooks/useAuth.ts";
import {Button, Divider, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConfirmedDeleteIconButton from "../../../components/Shared/ConfirmedDeleteIconButton.tsx";


type LessonOverviewProps = {
    lessons: Lesson[] | undefined,
    updateCourse: (updatedProperty: string, updatedValue: LessonDto[]) => void;
}

export default function LessonOverview({lessons, updateCourse}: Readonly<LessonOverviewProps>) {
    const {isInstructor} = useAuth();

    const deleteLesson = (lessonId: string) => {
        if (lessons) {
            updateCourse("lessons", convertToLessonDtoList(lessons.filter(lesson => lesson.id !== lessonId)))
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
                {lessons?.filter(lesson => isInstructor ? lesson : lesson.whenPublic.valueOf() < Date.now()).toSorted((a, b) => a?.whenPublic.getTime() - b?.whenPublic.getTime()).toSorted((a, b) => a?.whenPublic.getTime() - b?.whenPublic.getTime()).map(lesson=> (
                    <>
                        <ListItem
                            key={`lesson-${lesson.id}`}
                            secondaryAction={isInstructor &&
                                <ConfirmedDeleteIconButton toConfirmId={lesson.id} toConfirmName={lesson.title} toConfirmFunction={deleteLesson}/>}
                            disablePadding
                        >
                            <ListItemButton
                                component={Link}
                                to={`${lesson.id}`}
                            >
                                <ListItemText primary={lesson.title} secondary={lesson.whenPublic.valueOf() > Date.now() && "Unpublished"}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </>
                )) 
                }
            </List>
        </>
    )
}