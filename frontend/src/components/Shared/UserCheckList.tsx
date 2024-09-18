import {Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip} from "@mui/material";
import {Instructor, Student} from "../../types/userTypes.ts";
import {Dispatch, SetStateAction} from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import calcCourseGradeAverage from "../../utils/calcCourseGradeAverage.ts";
import {useCourse} from "../../hooks/useCourse.ts";
import GradeDisplay from "./GradeDisplay.tsx";

type CheckListProps = {
    editable: boolean
    options: Student[] | Instructor[]
    currentOptions: string[],
    setCurrentOptions: Dispatch<SetStateAction<string[]>>
};

export default function UserCheckList(props: Readonly<CheckListProps>) {
    const {isInstructor } = useAuth();
    const {course} = useCourse();
    const handleToggle = (id: string) => {
        if (props.currentOptions.includes(id)) {
            props.setCurrentOptions(props.currentOptions.filter(option => option !== id));
        } else {
            props.setCurrentOptions([...props.currentOptions, id]);
        }
    }

    return (
        <List sx={{width: '100%'}}>
            {props.options.filter(option => props.editable ? option : props.currentOptions.includes(option.id)).map((option: Instructor | Student) =>
                <ListItem key={`${option.id}`} disablePadding dense
                          secondaryAction={props.editable &&
                              <ListItemIcon>
                                  <Checkbox
                                      edge="end"
                                      checked={props.currentOptions.includes(option.id)}
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{ 'aria-labelledby': `checkbox-list-label-${option.id}` }}
                                      onClick={()=>handleToggle(option.id)}
                                  />
                              </ListItemIcon>
                          }
                >
                    <ListItemButton role={undefined} dense disableRipple sx={{cursor: 'default'}}>
                        <ListItemText
                            id={`checkbox-list-label-${option.id}`}
                            primary={option.username}
                        />
                        {
                            (!props.editable && isInstructor && 'grades' in option && course && option.grades[course.id]) &&
                            <ListItemText
                                id={`grade-average-list-${option.id}`}
                                primary={
                                    <Tooltip title={"Grade Average"}>
                                        <GradeDisplay grade={calcCourseGradeAverage(option.grades[course.id])}/>
                                    </Tooltip>
                                }
                                sx={{textAlign: 'right'}}
                            />
                        }
                    </ListItemButton>
                </ListItem>)}
        </List>
    );
};