"use client"
import { FaEnvelope, FaLock, FaUserAlt, FaMusic } from 'react-icons/fa';
import { useState } from 'react';
import Logo from "@/components/Logo/Logo";
import Input from "@/components/Input/Input";
import Button from '@/components/Button/Button';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('listener'); // listener or artist
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email and password are provided
        if (!email || !password) {
            setErrorMessage('Please fill out all fields!');
            return;
        }

        // Validate email format
        if (!validateEmail(email)) {
            setErrorMessage('Invalid email Address');
            return;
        }

        const userCredentials = { email, password, userType };

        // try {
        //     const response = await fetch('/api/auth/signup', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(userCredentials),
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         // Handle successful sign-up (e.g., redirect or show a success message)
        //     } else {
        //         setErrorMessage('Signup failed. Please try again.');
        //     }
        // } catch (error) {
        //     setErrorMessage('Something went wrong. Please try again later.');
        // }
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    return (
        <div className="background-login text-center">
            <div className="row mt-5 justify-content-center">
                <Logo />
                <h3 className="py-4">Sign Up</h3>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label text-light">Password</label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            icon={<FaLock />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* User Type Selection */}
                    <div className="mb-3 text-start">
                        <label htmlFor="user-type" className="form-label text-light">Select User Type</label>
                        <select
                            id="user-type"
                            className="form-select"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="listener">Listener</option>
                            <option value="artist">Artist</option>
                        </select>
                    </div>

                    {/* Conditional form fields for artists */}
                    {userType === 'artist' && (
                        <div className="mb-3 text-start">
                            <label htmlFor="artist-genre" className="form-label text-light">Music Genre</label>
                            <Input
                                id="artist-genre"
                                type="text"
                                placeholder="Enter your music genre"
                                icon={<FaMusic />}
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button className="w-100 mt-3" onClick={handleSubmit}>Sign Up</Button>
                </div>
            </div>

            <div className="p-4 d-flex justify-content-evenly">
                <h6>Already have an account? Login</h6>
            </div>
        </div>
    );
}
