import {ChangeEvent, FormEvent, useState} from "react";
import {NewUserDto} from "../types/userTypes.ts";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";



export default function RegisterPage() {
    const [user, setUser] = useState<NewUserDto>({username:"",email:"",password:"",role:"STUDENT"});
    const [showPassword, setShowPassword] = useState<boolean>();
    const navigate = useNavigate();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[e.target.name]: e.target.value});
    }

    const register = () => {
        axios.post("/api/auth/register", user)
            .then(() => {
                setUser({username:"",email:"",password:"",role:"STUDENT"})
                console.log("registered successfully")
                navigate("/")
            })
            .catch(e => {
                setUser({...user,password:""})
                console.error(e);
            })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register();
    }

    return (
        <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>I am a</legend>
                    <input type={"radio"} id={"student"} name={"role"} value={"STUDENT"}
                           checked={user.role === "STUDENT"}
                           onChange={handleChange}/>
                    <label htmlFor={"student"}>Student</label>
                    <input type={"radio"} id={"instructor"} name={"role"} value={"INSTRUCTOR"}
                           checked={user.role === "INSTRUCTOR"} onChange={handleChange}/>
                    <label htmlFor={"instructor"}>Instructor</label>
                </fieldset>
                <label htmlFor={"username"}>Username</label>
                <input type={"text"} name={"username"} value={user.username} placeholder={"Enter your username"}
                       onChange={handleChange} required/>
                <label htmlFor={"password"}>Password</label>
                <div className={"input-w-btn"}>
                    <input type={showPassword ? "text" : "password"} name={"password"} value={user.password}
                           placeholder={"Enter your password"}
                           onChange={handleChange} required/>
                    <button type={"button"} onClick={() => setShowPassword(!showPassword)} className={"password-btn"}>
                    <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                    </span></button>
                </div>
                <Button type={"submit"}>Register</Button>
            </form>
            <Link to={"/login"}>Login instead</Link>

        </>
    );
};