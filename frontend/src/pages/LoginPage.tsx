import {Link} from "react-router-dom";

type LoginPageProps = {
    handleLogin: () => void
};

export default function LoginPage({handleLogin}: Readonly<LoginPageProps>) {
    return (
        <>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login with GitHub</button>
            <p>First time here? <Link to={"/signup"}>Sign up</Link> instead.</p>
        </>
    );
};