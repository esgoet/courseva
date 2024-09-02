type LoginPageProps = {
    handleLogin: () => void
};

export default function LoginPage({handleLogin}: LoginPageProps) {
    return (
        <>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login with GitHub</button>
        </>
    );
};