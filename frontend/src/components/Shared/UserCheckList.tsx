import {Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Instructor, Student} from "../../types/userTypes.ts";
import {Dispatch, SetStateAction} from "react";

type CheckListProps = {
    editable: boolean
    options: Student[] | Instructor[]
    currentOptions: string[],
    setCurrentOptions: Dispatch<SetStateAction<string[]>>
};

export default function UserCheckList(props: Readonly<CheckListProps>) {
    const handleToggle = (id: string) => {
        if (props.currentOptions.includes(id)) {
            props.setCurrentOptions(props.currentOptions.filter(option => option !== id));
        } else {
            props.setCurrentOptions([...props.currentOptions, id]);
        }
    }
    return (
        <List sx={{width: '100%'}}>
            {props.options.filter(option => props.editable ? option : props.currentOptions.includes(option.id)).map((option) =>
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
                        <ListItemText id={`checkbox-list-label-${option.id}`} primary={option.username} />
                    </ListItemButton>
                </ListItem>)}
        </List>
    );
};