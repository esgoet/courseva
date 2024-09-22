import { useDataArray } from "./useDataArray"
import {Instructor, Student} from "../types/userTypes.ts";
import axiosInstance from "../api/axiosInstance.ts";
import {useAuth} from "./useAuth.ts";

export const useUsers = () => {
    const students = useDataArray<Student>('/api/students');
    const instructors = useDataArray<Instructor>('/api/instructors')
    const {user, setUser} = useAuth();

    const updateStudent = (updatedProperty?: string, updatedValue?: string, student = user?.student) => {
        if (user && student) {
            if (updatedProperty && updatedValue) student = {...student, [updatedProperty]: updatedValue};
            axiosInstance.put(`/api/students/${student.id}`, student)
                .then((response) => {
                    if (user.student === student) setUser({...user, student: response.data})
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
            userToUpdate = user?.instructor ? user.instructor : user.student;
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

    return {students, instructors, updateUserCourses, updateStudent, updateInstructor}
}