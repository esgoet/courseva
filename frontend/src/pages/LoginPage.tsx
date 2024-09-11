import {Link} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {UserLoginDto} from "../types/userTypes.ts";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type LoginPageProps = {
    login: (user : UserLoginDto) => void;
}

export default function LoginPage({login}:Readonly<LoginPageProps>) {
    const [user, setUser] = useState<UserLoginDto>({username:"", password:""});
    const [showPassword, setShowPassword] = useState<boolean>();

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
                <FormControl variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        label="Password"
                        name={"password"}
                        value={user.password}
                        onChange={handleChange}
                        required
                        aria-required
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button type={"submit"} variant={"outlined"} color={"secondary"}>Login</Button>
            </form>
            <p>First time here? <Link to={"/register"}>Register</Link> instead.</p>
        </>
    );
};