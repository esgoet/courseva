import {useContext, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from "../api/axiosInstance.ts";
import {checkIsInstructor} from "../utils/checkIsInstructor.ts";
import {UserLoginDto} from "../types/userTypes.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const [isInstructor, setIsInstructor] = useState<boolean>(false);
    const navigate = useNavigate();

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

    const deleteUser = (id: string) => {
        axiosInstance.delete(`/api/users/${id}`)
            .then(() =>  {
                logout();
            })
            .catch((error)=>console.error(error.response.data));
    }

    return {user, setUser, isInstructor, login, logout, updateUser, deleteUser};
};