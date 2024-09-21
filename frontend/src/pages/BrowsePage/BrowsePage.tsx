import {Box, Button, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import CourseList from "../../components/Course/CourseList/CourseList.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import CreateButton from "../../components/Shared/CreateButton.tsx";

type BrowsePageProps = {
    updateUser: (courseId: string, isAdded: boolean) => void,
};

export default function BrowsePage({updateUser}: Readonly<BrowsePageProps>) {
    const {isInstructor} = useAuth();

    return (
        <Paper elevation={3} square={false} sx={{p:'20px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button component={Link} to={"/"} variant={'outlined'}>Back to Dashboard</Button>
                {isInstructor &&
                    <CreateButton baseUrl={"/course"}/>}
            </Box>
            <h2>Browse Courses</h2>
            <CourseList updateUser={updateUser}/>
        </Paper>
    );
};