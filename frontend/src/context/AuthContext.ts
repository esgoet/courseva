import {createContext} from "react";
import {Instructor, Student} from "../types/userTypes.ts";

type AuthContextType = {
    user: Student | Instructor | null | undefined,
    isInstructor: boolean,
}

export const AuthContext = createContext<AuthContextType>({user: undefined, isInstructor: false});

