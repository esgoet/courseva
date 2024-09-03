import {ChangeEvent, useState} from "react";

type SignUpFormProps = {
    handleLogin: () => void;
};

export default function SignUpPage({handleLogin}: Readonly<SignUpFormProps>) {
    const [role, setRole] = useState<string>("STUDENT");

    const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
    }

    const handleSignUp = () => {
        localStorage.setItem('selectedRole', role);
        handleLogin();
    }

    return (
        <>
            <h2>Sign Up</h2>
            <input type={"radio"} id={"student"} name={"role"} value={"STUDENT"} checked={role==="STUDENT"} onChange={handleRoleChange}/>
            <label htmlFor={"student"}>Student</label>
            <input type={"radio"} id={"instructor"} name={"role"} value={"INSTRUCTOR"} checked={role==="INSTRUCTOR"} onChange={handleRoleChange}/>
            <label htmlFor={"instructor"}>Instructor</label>
            <button onClick={handleSignUp}>Login with GitHub</button>
        </>
    );
};