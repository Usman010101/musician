"use client"
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import Logo from "@/components/Logo/Logo"
import Input from "@/components/Input/Input"
import Button from '@/components/Button/Button';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async () => {
        console.log("Bnutton clocked")
        // Check if email and password are provided
        if (!email || !password) {
            setErrorMessage("Please fill out all fields!");
            return;
        }

        // Validate email format
        if (!validateEmail(email)) {
            setErrorMessage("Invalid email Address");
            return;
        }

        const userCredentials = { email, password };

        // try {
        //     const response = await fetch("api/auth/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(userCredentials)
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         localStorage.setItem("token", data.token);
        //         // Optionally, redirect user on successful login or handle other logic
        //     } else {
        //         setErrorMessage("Invalid Credentials.");
        //     }
        // } catch (error) {
        //     setErrorMessage("Something went wrong. Please try again later.");
        // }
    }

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    return (
        <div className="background-login text-center">
            <div className="row mt-5 justify-content-center">
                <Logo />
                <h3 className="py-4">Login To Continue</h3>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6 p-4 rounded">
                    {/* Display error message */}
                    {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label text-light">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            icon={<FaEnvelope />}
                            value={email} // Bind email value
                            onChange={(e) => setEmail(e.target.value)} // Update email state on change
                        />
                    </div>

                    <div className="mb-5 text-start">
                        <label htmlFor="password" className="form-label text-light">Password</label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            icon={<FaLock />}
                            value={password} // Bind password value
                            onChange={(e) => setPassword(e.target.value)} // Update password state on change
                        />
                    </div>

                    {/* Button to trigger form submission */}
                    <Button className="w-100 mt-3" onClick={handleSubmit}>Login</Button>
                </div>

                <div className="p-4 d-flex justify-content-evenly">
                    <h6>Create a new account?</h6>
                    <h6>Forgot Password?</h6>
                </div>
            </div>
        </div>
    );
}
