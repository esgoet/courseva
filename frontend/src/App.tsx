import './App.css'
import {useEffect, useMemo, useState} from "react";
import {AssignmentDto, Course, CourseDto, LessonDto, NewCourseDto} from "./types/courseTypes.ts";
import axios, {AxiosResponse} from 'axios';
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
import {convertToCourse} from "./utils/convertToCourse.ts";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import {Instructor, Student, UserLoginDto} from "./types/userTypes.ts";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes.tsx";
import Header from "./components/Layout/Header.tsx";
import ProtectedInstructorRoutes from "./components/Routes/ProtectedInstructorRoutes.tsx";
import {checkIsInstructor} from "./utils/checkIsInstructor.ts";
import {AuthContext} from "./context/AuthContext.ts";

export default function App() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentCourse, setCurrentCourse] = useState<Course | undefined>();
    const [user, setUser] = useState<Student | Instructor | null | undefined>();
    const [students, setStudents] = useState<Student[]>([]);
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [isInstructor, setIsInstructor] = useState<boolean>(false);
    const navigate = useNavigate();

    const authContextValue = useMemo(() => ({ user, isInstructor }), [user, isInstructor]);


    const fetchCourses = () => {
        axios.get("/api/courses")
            .then((response : AxiosResponse<CourseDto[]>) => setCourses(response.data.map(convertToCourse)))
            .catch((error) => console.error(error))
    }

    const createCourse = (course : NewCourseDto)  => {
        axios.post("/api/courses", course)
            .then((response : AxiosResponse<Course>) => {
                if (response.status === 200) {
                    fetchCourses();
                    navigate(`/course/${response.data.id}`);
                }
            })
            .catch((error) => console.error(error.response.data));
    }
    const fetchCourse = (id: string) => {
        axios.get(`/api/courses/${id}`)
            .then((response) => {
                setCurrentCourse(convertToCourse(response.data));
            })
            .catch((error) => {
                console.error(error.response.data);
                setCurrentCourse(undefined);
            });
    }

    const fetchStudents = () => {
        axios.get("/api/students")
            .then((response : AxiosResponse<Student[]>) => setStudents(response.data))
            .catch((error) => console.error(error.response.data));
    }

    const fetchInstructors = () => {
        axios.get("/api/instructors")
            .then((response : AxiosResponse<Instructor[]>) => setInstructors(response.data))
            .catch((error) => console.error(error.response.data));
    }

    const updateCourse = (updatedProperty: string, updatedValue: string | string[] | LessonDto[] | AssignmentDto[]) => {
        axios.put(`/api/courses/${currentCourse?.id}`, {...currentCourse, [updatedProperty]: updatedValue})
            .then((response) => {
                if (response.status === 200) {
                    if (currentCourse?.id) fetchCourse(currentCourse.id);
                    fetchCourses();
                }
            })
            .catch((error)=>console.error(error.response.data));
    }

    const deleteCourse = (courseId: string) => {
        axios.delete(`/api/courses/${courseId}`)
            .then((response)=> response.status === 200 && fetchCourses())
            .catch((error)=> console.error(error.response.data))
    }

    const fetchUser = () => {
        axios.get("/api/auth/me")
            .then((response) => {
                setUser(response.data)
                setIsInstructor(checkIsInstructor(response.data))
                navigate("/")
            })
            .catch(error => {
                console.error(error.response.data)
                setUser(null);
            });
    }

    const login = (user: UserLoginDto) => {
        axios.post("/api/auth/login", {}, {
            auth: {
                username: user.username,
                password: user.password
            }
        })
            .then(()=> {
                fetchUser();
            })
            .catch(error => {
                setUser(null);
                console.error(error.response.data)
            })
    }

    const logout = () => {
        axios.post("api/auth/logout")
            .then(() => {
                console.log('Logged out')
                navigate("/login")
            })
            .catch((error) => console.error(error))
            .finally(()=>setUser(null));
    }

    useEffect(()=>{
        fetchCourses();
        fetchStudents();
        fetchInstructors();
    }, []);


    return (
        <AuthContext.Provider value={authContextValue}>
            <Header logout={logout}/>
            <main>
                    <Routes>
                        <Route path={"/register"} element={<RegisterPage />}/>
                        <Route path={"/login"} element={<LoginPage login={login}/>}/>
                        <Route element={<ProtectedRoutes />}>
                                <Route path={"/"} element={<Dashboard courses={courses} deleteCourse={deleteCourse}/>}/>
                                <Route path={"/course/:courseId"} element={<CourseDetailsPage updateCourse={updateCourse} course={currentCourse} fetchCourse={fetchCourse} deleteCourse={deleteCourse} students={students} instructors={instructors}/>}>
                                    <Route path={"lessons"} element={<LessonOverview lessons={currentCourse?.lessons} updateCourse={updateCourse}/>}/>
                                    <Route path={"lessons/:lessonId"} element={<LessonPage lessons={currentCourse?.lessons} updateCourse={updateCourse}/>}/>
                                    <Route path={"assignments"} element={<AssignmentOverview assignments={currentCourse?.assignments} updateCourse={updateCourse}/>}/>
                                    <Route path={"assignments/:assignmentId"} element={<AssignmentPage assignments={currentCourse?.assignments} updateCourse={updateCourse}/>}/>
                                    <Route path={"assignments/:assignmentId/submission/:submissionId"} element={<SubmissionPage assignments={currentCourse?.assignments}/>}/>
                                    <Route element={<ProtectedInstructorRoutes />}>
                                        <Route path={"lessons/create"} element={<LessonCreator updateCourse={updateCourse} lessons={currentCourse?.lessons}/>}/>
                                        <Route path={"assignments/create"} element={<AssignmentCreator assignments={currentCourse?.assignments} updateCourse={updateCourse} />}/>
                                    </Route>
                                </Route>
                                <Route element={<ProtectedInstructorRoutes/>}>
                                    <Route path={"/course/create"} element={<CourseCreator createCourse={createCourse} students={students} instructors={instructors}/>}/>
                                </Route>
                        </Route>
                    </Routes>
            </main>
        </AuthContext.Provider>
    )
}