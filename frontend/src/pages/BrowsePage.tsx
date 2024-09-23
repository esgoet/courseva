import {Box, Button, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import CourseList from "../components/Course/CourseList/CourseList.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import CreateButton from "../components/Shared/CreateButton.tsx";

export default function BrowsePage() {
    const {user} = useAuth();

    return (
        <Paper elevation={3} square={false} sx={{p:'20px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button component={Link} color={"info"} to={"/"} variant={'outlined'}>Back to Dashboard</Button>
                {user?.instructor &&
                    <CreateButton baseUrl={"/course"}/>}
            </Box>
            <h2>Browse Courses</h2>
            <CourseList />
        </Paper>
    );
};