import {AppUser} from "../types/userTypes.ts";

export function checkIsInstructor(user: AppUser | null | undefined): boolean {
    if (user) {
        return user.instructor !== undefined;
    } else {
        return false;
    }
}