import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";
import CourseList from "../../components/Course/CourseList/CourseList.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import AddIcon from "@mui/icons-material/Add";

type BrowsePageProps = {
    updateUser: (courseId: string, isAdded: boolean) => void,
};

export default function BrowsePage({updateUser}: Readonly<BrowsePageProps>) {
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
            <CourseList updateUser={updateUser}/>
        </>
    );
};