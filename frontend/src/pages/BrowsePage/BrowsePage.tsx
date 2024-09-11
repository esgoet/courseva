import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";
import CourseList from "../../components/Course/CourseList/CourseList.tsx";
import {Course} from "../../types/courseTypes.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import AddIcon from "@mui/icons-material/Add";

type BrowsePageProps = {
    courses: Course[],
    deleteCourse: (courseId: string) => void,
    updateUser: (updatedProperty: string, updatedValue: string[]) => void,
    updateCourse: (updatedProperty: string, updatedValue: string[], course: Course) => void,
};

export default function BrowsePage({courses, deleteCourse, updateUser, updateCourse}: Readonly<BrowsePageProps>) {
    const {isInstructor} = useAuth();

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button component={Link} to={"/"} variant={'outlined'}>Back to Dashboard</Button>
                {isInstructor &&
                    <Button component={Link} to={"/course/create"} variant={"outlined"} color={"secondary"} startIcon={<AddIcon/>}>
                        Create
                    </Button>}
            </Box>
            <CourseList courses={courses} deleteCourse={deleteCourse} updateUser={updateUser} updateCourse={updateCourse}/>
        </>
    );
};