import { useState } from "react";
import * as usersService from "../../utils/users-service"
import { login } from "../../utils/users-api";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

export default function LoginPage({ setUser }) {
    const [ credentials, setCredentials ] = useState({
        email: "",
        password:"",
    });

    const navigate = useNavigate();

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
            if (user.isAdmin) {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            setError("Log In Failed - Try Again!")
        }
    }

    return (
        // <div>
        //     <div className="form-container">
        //         <form autoComplete="off" onSubmit={handleSubmit}>
        //             <label>Email</label>
        //             <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        //             <label>Password</label>
        //             <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        //             <button type="submit" >LOG IN</button>
        //         </form>
        //     </div>
        //     <p className="error-message">&nbsp;{error}</p>
        //     </div>
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" value={credentials.email} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit} style={{ width: "100%"}}>Log IN</Button>
            </Form>
        </>
    );
}
