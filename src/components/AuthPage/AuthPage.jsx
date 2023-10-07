import SignUpForm from "../SignUpForm/SignUpForm";

export default function AuthPage({user, setUser}) {
    return (
        <>
            <h1>Authentication Page</h1>
            <SignUpForm user={user} setUser={setUser} />
        </>
    );
}