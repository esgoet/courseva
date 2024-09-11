import {Link} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {UserLoginDto} from "../types/userTypes.ts";
import {Button, TextField} from "@mui/material";
import PasswordField from "../components/Shared/PasswordField.tsx";

type LoginPageProps = {
    login: (user : UserLoginDto) => void;
}

export default function LoginPage({login}:Readonly<LoginPageProps>) {
    const [user, setUser] = useState<UserLoginDto>({username:"", password:""});


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[e.target.name]: e.target.value});
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUser({username:"", password:""});
        login(user);
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label={"Username"}
                    type={"text"}
                    name={"username"}
                    value={user.username}
                    onChange={handleChange}
                    required
                    aria-required
                />
                <PasswordField password={user.password} handleChange={handleChange}/>
                <Button type={"submit"} variant={"outlined"} color={"secondary"}>Login</Button>
            </form>
            <p>First time here? <Link to={"/register"}>Register</Link> instead.</p>
        </>
    );
};