import { useState } from "react";
import * as usersService from "../../utils/users-service"
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

export default function LoginPage({ setUser }) {
    const [ credentials, setCredentials ] = useState({
        email: "",
        password:"",
    });

    const navigate = useNavigate();

    function handleChange(event) {
        setCredentials({...credentials, [event.target.name]: event.target.value});
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
            console.log("Log In Failed - Try Again!")
        }
    }

    return (
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" value={credentials.email} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit} style={{ width: "100%"}}>Log In</Button>
            </Form>
    );
}
