import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {UserLoginDto} from "../types/userTypes.ts";
import {Button, TextField, Stack} from "@mui/material";
import PasswordField from "../components/Shared/PasswordField.tsx";
import {useAuth} from "../hooks/useAuth.ts";

export default function LoginPage() {
    const [user, setUser] = useState<UserLoginDto>({email:"", password:""});
    const {user: loggedInUser, login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[e.target.name]: e.target.value});
    }

    useEffect(()=> {
        if (loggedInUser) navigate("/");
    },[loggedInUser, navigate])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUser({email:"", password:""});
        login(user);
    }

    return (
        <Stack spacing={2} maxWidth={"sm"} sx={{mx: "auto"}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label={"Email"}
                        type={"email"}
                        name={"email"}
                        value={user.email}
                        onChange={handleChange}
                        required
                        aria-required
                    />
                    <PasswordField password={user.password} handleChange={handleChange}/>
                    <Button type={"submit"} variant={"outlined"} color={"secondary"}>Login</Button>
                </Stack>
            </form>
            <p>First time here? <Link to={"/register"}>Register</Link> instead.</p>
        </Stack>
    );
};