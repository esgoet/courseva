import './App.css'
import {useEffect, useMemo, useState} from "react";
import {CourseDto} from "./types/courseTypes.ts";
import {Route, Routes, useNavigate} from "react-router-dom";
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
import {AppUser, Instructor, Student, UserLoginDto} from "./types/userTypes.ts";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes.tsx";
import Header from "./components/Layout/Header.tsx";
import ProtectedInstructorRoutes from "./components/Routes/ProtectedInstructorRoutes.tsx";
import {checkIsInstructor} from "./utils/checkIsInstructor.ts";
import {AuthContext} from "./context/AuthContext.ts";
import UserAccountPage from "./pages/UserAccountPage.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {themeOptions} from "./styles/themeOptions.ts";
import ParticipantOverview from "./pages/CourseDetails/Participant/ParticipantOverview.tsx";
import BrowsePage from "./pages/BrowsePage.tsx";
import axiosInstance from "./api/axiosInstance.ts";
import axios from "axios";
import {useDataArray} from "./hooks/useDataArray.ts";
import {CoursesContext} from "./context/CoursesContext.ts";

export default function App() {
    const {data: courses, setData: setCourses, loading, error} = useDataArray<CourseDto>('/api/courses');
    const [user, setUser] = useState<AppUser | null | undefined>();
    const [isInstructor, setIsInstructor] = useState<boolean>(false);
    const navigate = useNavigate();
    const theme = createTheme({cssVariables: true,...themeOptions});

    const coursesContextValue = useMemo(() => ({courses, setCourses, loading, error}), [courses, setCourses, loading, error]);

    const authContextValue = useMemo(() => ({ user, isInstructor}), [user, isInstructor]);


    async function fetchUser() : Promise<void> {
        return axiosInstance.get("/api/auth/me")
            .then((response) => {
                setUser(response.data)
                setIsInstructor(checkIsInstructor(response.data))
            })
            .catch(error => {
                console.error(error.response.data)
                setUser(null);
            });
    }

    const login = (user: UserLoginDto) => {
        axios.get("/api/auth/me", {
            auth: {
                username: user.email,
                password: user.password
            }
        })
            .then((response)=> {
                setUser(response.data)
                setIsInstructor(checkIsInstructor(response.data))
                // fetchCourses();
                // fetchStudents();
                // fetchInstructors();
                navigate("/");
            })
            .catch(error => {
                setUser(null);
                console.error(error.response.data)
            })
    }

    const logout = () => {
        axiosInstance.post("/api/auth/logout")
            .then(() => {
                console.log('Logged out')
                navigate("/login")
            })
            .catch((error) => console.error(error))
            .finally(()=>setUser(null));
    }

    const updateUser = (updatedProperty: string, updatedValue: string) => {
        if (user) axiosInstance.put(`/api/users/${user.id}`, {...user, [updatedProperty]: updatedValue})
            .then((response) => {
                setUser(response.data)
            })
            .catch((error)=>console.error(error.response.data));
    }

    const updateStudent = (updatedProperty?: string, updatedValue?: string, student = user?.student) => {
        if (user && student) {
            if (updatedProperty && updatedValue) student = {...student, [updatedProperty]: updatedValue};
            axiosInstance.put(`/api/students/${student.id}`, student)
                .then((response) => {
                    setUser({...user, student: response.data})
                })
                .catch((error)=>console.error(error.response.data));
        }
    }

    const updateInstructor = (updatedProperty?: string, updatedValue?: string, instructor = user?.instructor) => {
        if (user && instructor) {
            if (updatedProperty && updatedValue) instructor = {...instructor, [updatedProperty]: updatedValue};
            axiosInstance.put(`/api/instructors/${instructor.id}`, instructor)
                .then((response) => {
                    setUser({...user, instructor: response.data})
                })
                .catch((error)=>console.error(error.response.data));
        }
    }

    const updateUserCourses = (courseId: string, isAdded: boolean, userToUpdate?: Student | Instructor): void => {
        if (!userToUpdate && user) {
            userToUpdate = isInstructor ? user.instructor : user.student;
        }
        if (userToUpdate) {
            if (isAdded) {
                userToUpdate.courses.push(courseId);
            } else {
                userToUpdate.courses = userToUpdate.courses.filter(course => course !== courseId);
            }
            if ('grades' in userToUpdate) {
                updateStudent(undefined, undefined, userToUpdate);
            } else {
                updateInstructor(undefined, undefined, userToUpdate);
            }
        }
    }

    const deleteUser = (id: string) => {
        axiosInstance.delete(`/api/users/${id}`)
            .then(() =>  {
                logout();
            })
            .catch((error)=>console.error(error.response.data));
    }

    useEffect(()=>{
        fetchUser()
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={authContextValue}>
                <CoursesContext.Provider value={coursesContextValue}>
                    <Header logout={logout}/>
                    <main>
                        <Routes>
                            <Route path={"/register"} element={<RegisterPage />}/>
                            <Route path={"/login"} element={<LoginPage login={login}/>}/>
                            <Route element={<ProtectedRoutes />}>
                                <Route path={"/"} element={<Dashboard updateUser={updateUserCourses} />}/>
                                <Route path={"/browse"} element={<BrowsePage updateUser={updateUserCourses}/>}/>
                                <Route path={"/account"} element={<UserAccountPage updateUser={updateUser} deleteUser={deleteUser} updateInstructor={updateInstructor} updateStudent={updateStudent}/>}/>
                                <Route path={"/course/:courseId"} element={<CourseDetailsPage updateUser={updateUserCourses}/>}>
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