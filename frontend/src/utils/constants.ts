import {SvgIconTypeMap} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const pages : {title: string, url: string}[] = [
    {
        title: "Dashboard",
        url: "/"
    },
    {
        title: "Browse",
        url: "/browse"
    },
]

export const coursePages : {title: string, url: string, icon:  OverridableComponent<SvgIconTypeMap> & {         muiName: string     }}[] = [
    {
        title: "Participants",
        url: "participants",
        icon: PeopleIcon
    },
    {
        title: "Lessons",
        url: "lessons",
        icon: SchoolIcon
    },
    {
        title: "Assignments",
        url: "assignments",
        icon: AssignmentIcon
    }
]
