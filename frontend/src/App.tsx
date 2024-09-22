import './App.css'
import {useMemo} from "react";
import {CourseDto} from "./types/courseTypes.ts";
import {Route, Routes} from "react-router-dom";
import CourseDetailsPage from "./pages/CourseDetails/CourseDetailsPage.tsx";
import CourseCreator from "./pages/CourseCreator.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import LessonOverview from "./pages/CourseDetails/Lesson/LessonOverview.tsx";
import AssignmentOverview from "./pages/CourseDetails/Assignment/AssignmentOverview.tsx";
import LessonPage from "./pages/CourseDetails/Lesson/LessonPage.tsx";
import AssignmentPage from "./pages/CourseDetails/Assignment/AssignmentPage.tsx";
import LessonCreator from "./pages/CourseDetails/Lesson/LessonCreator.tsx";
import AssignmentCreator from "./pages/CourseDetails/Assignment/AssignmentCreator.tsx";
import SubmissionPage from "./pages/CourseDetails/Assignment/SubmissionPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import {AppUser} from "./types/userTypes.ts";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes.tsx";
import Header from "./components/Layout/Header.tsx";
import ProtectedInstructorRoutes from "./components/Routes/ProtectedInstructorRoutes.tsx";
import {AuthContext} from "./context/AuthContext.ts";
import UserAccountPage from "./pages/UserAccountPage.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {themeOptions} from "./styles/themeOptions.ts";
import ParticipantOverview from "./pages/CourseDetails/Participant/ParticipantOverview.tsx";
import BrowsePage from "./pages/BrowsePage.tsx";
import {useDataArray} from "./hooks/useDataArray.ts";
import {CoursesContext} from "./context/CoursesContext.ts";
import {useDataObject} from "./hooks/useDataObject.ts";

export default function App() {
    const {data: courses, setData: setCourses, loading, error} = useDataArray<CourseDto>('/api/courses');
    const {data: user, setData: setUser} = useDataObject<AppUser | null>('/api/auth/me');
    const theme = createTheme({cssVariables: true,...themeOptions});

    const coursesContextValue = useMemo(() => ({courses, setCourses, loading, error}), [courses, setCourses, loading, error]);
    const authContextValue = useMemo(() => ({ user, setUser}), [user, setUser]);


    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={authContextValue}>
                <CoursesContext.Provider value={coursesContextValue}>
                    <Header/>
                    <main>
                        <Routes>
                            <Route path={"/register"} element={<RegisterPage />}/>
                            <Route path={"/login"} element={<LoginPage />}/>
                            <Route element={<ProtectedRoutes />}>
                                <Route path={"/"} element={<Dashboard />}/>
                                <Route path={"/browse"} element={<BrowsePage />}/>
                                <Route path={"/account"} element={<UserAccountPage />}/>
                                <Route path={"/course/:courseId"} element={<CourseDetailsPage />}>
                                    <Route index element={<ParticipantOverview/>}/>
                                    <Route path={"lessons"} element={<LessonOverview />}/>
                                    <Route path={"lessons/:lessonId"} element={<LessonPage />}/>
                                    <Route path={"assignments"} element={<AssignmentOverview />}/>
                                    <Route path={"assignments/:assignmentId"} element={<AssignmentPage />}/>
                                    <Route path={"assignments/:assignmentId/submission/:submissionId"} element={<SubmissionPage />}/>
                                    <Route element={<ProtectedInstructorRoutes />}>
                                        <Route path={"lessons/create"} element={<LessonCreator/>}/>
                                        <Route path={"assignments/create"} element={<AssignmentCreator/>}/>
                                    </Route>
                                </Route>
                                <Route element={<ProtectedInstructorRoutes/>}>
                                    <Route path={"/course/create"} element={<CourseCreator />}/>
                                </Route>
                            </Route>
                        </Routes>
                    </main>
                </CoursesContext.Provider>
            </AuthContext.Provider>
        </ThemeProvider>
    )
}