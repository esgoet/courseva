import {Link} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {UserLoginDto} from "../types/userTypes.ts";

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

                <label htmlFor={"username"}>Username</label>
                <input type={"text"} name={"username"} value={user.username} placeholder={"Enter your username"}
                       onChange={handleChange} required/>
                <label htmlFor={"password"}>Password</label>
                <input type={"password"} name={"password"} value={user.password} placeholder={"Enter your password"}
                       onChange={handleChange} required/>
                <button>Login</button>
            </form>
            <p>First time here? <Link to={"/register"}>Register</Link> instead.</p>
        </>
    );
};