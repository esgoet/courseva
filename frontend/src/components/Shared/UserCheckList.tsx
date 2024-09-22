import {Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip} from "@mui/material";
import {Instructor, Student} from "../../types/userTypes.ts";
import {Dispatch, SetStateAction} from "react";
import {calculateStudentGradeAverage} from "../../utils/calculateGradeAverage.ts";
import GradeDisplay from "./GradeDisplay.tsx";
import { Course } from "../../types/courseTypes.ts";
import DataStateHandler from "./DataStateHandler.tsx";
import {useAuth} from "../../hooks/useAuth.ts";

type CheckListProps = {
    editable: boolean,
    options: { data: Student[]|Instructor[], loading: boolean, error: Error | undefined},
    currentOptions: string[],
    setCurrentOptions: Dispatch<SetStateAction<string[]>>,
    course?: Course
};

export default function UserCheckList(props: Readonly<CheckListProps>) {
    const {user} = useAuth();

    const handleToggle = (id: string) => {
        if (props.currentOptions.includes(id)) {
            props.setCurrentOptions(props.currentOptions.filter(option => option !== id));
        } else {
            props.setCurrentOptions([...props.currentOptions, id]);
        }
    }

    return (
        <DataStateHandler loading={props.options.loading} error={props.options.error} height={'100px'}>
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
                                (props.course &&!props.editable && user?.instructor && 'grades' in option  && option.grades[props.course.id]) &&
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
        </DataStateHandler>

    );
};