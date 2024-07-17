import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import statement
import './Login.css';

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                username,
                password
            });

            const { authToken } = response.data;

            // Store authToken in localStorage
            localStorage.setItem('authToken', authToken);

            // Redirect to '/'
            navigate('/'); // Navigate to home page after successful login
        } catch (error) {
            alert('Invalid credentials'); // Notify user about invalid credentials
            console.error('Login error:', error);
        }
    };

    return (
        <main className="container">
            <section id="login-form">
                <h2>Login</h2>
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
                    <button type="submit">Login</button>
                </form>
            </section>
        </main>
    );
};

export default Login;
