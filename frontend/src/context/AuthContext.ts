import {createContext, Dispatch, SetStateAction} from "react";
import { AppUser } from "../types/userTypes";

type AuthContextType = {
    user: AppUser | null | undefined,
    setUser: Dispatch<SetStateAction<AppUser | null | undefined>>
}

export const AuthContext = createContext<AuthContextType>({user: undefined, setUser: () => {}});

