import './App.css'
import {useEffect, useState} from "react";
import {AssignmentDto, Course, CourseDto, LessonDto, NewCourseDto} from "./types/courseTypes.ts";
import axios, {AxiosResponse} from 'axios';
import {Route, Routes, useNavigate} from "react-router-dom";
import CoursePage from "./pages/CoursePage.tsx";
import CourseCreator from "./components/CourseCreator.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import LessonOverview from "./components/LessonOverview.tsx";
import AssignmentOverview from "./components/AssignmentOverview.tsx";
import LessonPage from "./components/LessonPage.tsx";
import AssignmentPage from "./components/AssignmentPage.tsx";
import LessonCreator from "./components/LessonCreator.tsx";
import AssignmentCreator from "./components/AssignmentCreator.tsx";
import SubmissionPage from "./components/SubmissionPage.tsx";
import {convertToCourse} from "./utils/convertToCourse.ts";
import SignUpPage from "./components/SignUpPage.tsx";
import LoginPage from "./components/LoginPage.tsx";
import {Instructor, Student} from "./types/userTypes.ts";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import Header from "./components/Header.tsx";
import ProtectedInstructorRoutes from "./components/ProtectedInstructorRoutes.tsx";
import {checkIsInstructor} from "./utils/checkIsInstructor.ts";
import {AuthContext} from "./components/AuthContext.tsx";

export default function App() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentCourse, setCurrentCourse] = useState<Course | undefined>();
    const [user, setUser] = useState<Student | Instructor | null | undefined>();
    const [students, setStudents] = useState<Student[]>([]);
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [isInstructor, setIsInstructor] = useState<boolean>(false);
    const navigate = useNavigate();

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
                    navigate(`/course/${response.data.id}`)
                }
            })
            .catch((error) => console.error(error.response.data))
    }
    const fetchCourse = (id: string) => {
        axios.get(`/api/courses/${id}`)
            .then((response) => {
                setCurrentCourse(convertToCourse(response.data))
                console.log("fetching course")
            })
            .catch((error) => {
                console.error(error.response.data);
                setCurrentCourse(undefined);
            })
    }

    const fetchStudents = () => {
        axios.get("/api/students")
            .then((response : AxiosResponse<Student[]>) => setStudents(response.data))
            .catch((error) => console.error(error))
    }

    const fetchInstructors = () => {
        axios.get("/api/instructors")
            .then((response : AxiosResponse<Instructor[]>) => setInstructors(response.data))
            .catch((error) => console.error(error))
    }

    const updateCourse = (updatedProperty: string, updatedValue: string | string[] | LessonDto[] | AssignmentDto[]) => {
        axios.put(`/api/courses/${currentCourse?.id}`, {...currentCourse, [updatedProperty]: updatedValue})
            .then((response) => {
                if (response.status === 200) {
                    if (currentCourse?.id) fetchCourse(currentCourse.id);
                    fetchCourses();
                }
            })
            .catch((error)=>console.error(error.response.data))
    }

    const deleteCourse = (courseId: string) => {
        axios.delete(`/api/courses/${courseId}`)
            .then((response)=> response.status === 200 && fetchCourses())
            .catch((error)=> console.error(error.response.data))
    }

    const handleLogin = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin;
        window.open(host + '/oauth2/authorization/github', '_self');
    }

    const handleLogout = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin;
        window.open(host + '/logout', '_self');

    }

    const loadUser = () => {
        axios.get("/api/auth/me")
            .then((response) => {
                setUser(response.data)
                setIsInstructor(checkIsInstructor(response.data))
            })
            .catch(error => {
                console.error(error.response.data)
                setUser(null);
            });
    }

    useEffect(()=>{
        fetchCourses();
        loadUser();
        fetchStudents();
        fetchInstructors();
    }, []);



        return (
        <>
            <AuthContext.Provider value={{user, isInstructor}}>
                <Header handleLogout={handleLogout}/>
                <main>
                        <Routes>
                            <Route path={"/signup"} element={<SignUpPage handleLogin={handleLogin}/>}/>
                            <Route path={"/login"} element={<LoginPage handleLogin={handleLogin}/>}/>
                            <Route element={<ProtectedRoutes user={user}/>}>
                                    <Route path={"/"} element={<Dashboard courses={courses} deleteCourse={deleteCourse}/>}/>
                                    <Route path={"/course/:courseId"} element={<CoursePage updateCourse={updateCourse} course={currentCourse} fetchCourse={fetchCourse} deleteCourse={deleteCourse} students={students} instructors={instructors}/>}>
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
        </>
  )
}