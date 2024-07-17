import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import statement

const Register = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                username,
                password
            });
                alert('user registered successfuly')
                navigate('/login'); 
        } catch (error) {
            alert('User already exits. please choose other name'); // Notify user about invalid credentials
            console.error('register error:', error);
        }
    };

    return (
        <main className="container">
            <section id="login-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </section>
        </main>
    );
};

export default Register;