import {createContext} from "react";
import { AppUser } from "../types/userTypes";

type AuthContextType = {
    user: AppUser | null | undefined,
    isInstructor: boolean,
}

export const AuthContext = createContext<AuthContextType>({user: undefined, isInstructor: false});

