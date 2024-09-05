import {Instructor, Student} from "../types/userTypes.ts";

export function checkIsInstructor(user: Student | Instructor | null | undefined): user is Instructor {
    if (user) {
        return !('grades' in user);
    } else {
        return false;
    }
}