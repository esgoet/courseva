import {ChangeEvent, FormEvent, useState} from "react";
import {NewUserDto} from "../types/userTypes.ts";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel, Stack,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import PasswordField from "../components/Shared/PasswordField.tsx";



export default function RegisterPage() {
    const [user, setUser] = useState<NewUserDto>({username:"",email:"",password:"",role:"STUDENT"});
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
        <Stack spacing={2} maxWidth={"sm"} sx={{mx: "auto"}}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>I want to use the platform as</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="STUDENT" control={<Radio />} label="Student" />
                            <FormControlLabel value="INSTRUCTOR" control={<Radio />} label="Instructor" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        label={"Username"}
                        type={"text"}
                        name={"username"}
                        value={user.username}
                        onChange={handleChange}
                        required
                        aria-required
                    />
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
                    <Button type={"submit"} variant={"outlined"} color={"secondary"}>Register</Button>
                </Stack>
            </form>
            <p>Been here before? <Link to={"/login"}>Login</Link> instead.</p>

        </Stack>
    );
};