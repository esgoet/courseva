import {Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Tooltip} from "@mui/material";
import {Instructor, Student} from "../../types/userTypes.ts";
import {Dispatch, SetStateAction} from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import {calculateStudentGradeAverage} from "../../utils/calculateGradeAverage.ts";
import GradeDisplay from "./GradeDisplay.tsx";
import { Course } from "../../types/courseTypes.ts";

type CheckListProps = {
    editable: boolean
    options: { data: Student[]|Instructor[], error: Error | undefined, loading: boolean }
    currentOptions: string[],
    setCurrentOptions: Dispatch<SetStateAction<string[]>>,
    course?: Course
};

export default function UserCheckList(props: Readonly<CheckListProps>) {
    const {isInstructor } = useAuth();
    const handleToggle = (id: string) => {
        if (props.currentOptions.includes(id)) {
            props.setCurrentOptions(props.currentOptions.filter(option => option !== id));
        } else {
            props.setCurrentOptions([...props.currentOptions, id]);
        }
    }

    return (
        <>
            {props.options.loading ?
                <Skeleton variant={"rounded"} height={'100px'}/>
                :
                !props.options.error ?
                    <List sx={{width: '100%'}}>
                        {props.options.data.filter(option => props.editable ? option : props.currentOptions.includes(option.id)).map((option: Instructor | Student) =>
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
                                        (props.course &&!props.editable && isInstructor && 'grades' in option  && option.grades[props.course.id]) &&
                                        <ListItemText
                                            id={`grade-average-list-${option.id}`}
                                            primary={
                                                <Tooltip title={"Grade Average"}>
                                                    <GradeDisplay grade={calculateStudentGradeAverage(option.grades[props.course.id])}/>
                                                </Tooltip>
                                            }
                                            sx={{textAlign: 'right'}}
                                        />
                                    }
                                </ListItemButton>
                            </ListItem>)}
                    </List>
                    :
                    <p>Something went wrong. {props.options.error.message}</p>}
        </>
    );
};