import { useState } from "react";
import * as usersService from "../../utils/users-service"
import { login } from "../../utils/users-api";

export default function LoginForm({ setUser }) {
    const [ credentials, setCredentials ] = useState({
        email: "",
        password:"",
    });

    const [ error, setError ] = useState("");

    function handleChange(event) {
        setCredentials({...credentials, [event.target.name]: event.target.value});
        setError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const user = await usersService.login(credentials);
            setUser(user);
        } catch (error) {
            setError("Log In Failed - Try Again!")
        }
    }

    return (
        <div>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                    <button type="submit" >LOG IN</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}
