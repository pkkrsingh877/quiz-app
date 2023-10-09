import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                withCredentials: true, // Include cookies in the request
            });
            if (!response.ok) {
                throw new Error('Data could not be saved!');
            }
            // Get object where token is
            const data = await response.json();
            console.log(data);

            // Set the JWT token as a cookie in the browser
            document.cookie = `jwt=${data.token}; maxAge=86400`;

            navigate('/user/profile');
        } catch (error) {
            console.log(error)
            navigate('/notfound');
        }
    };

    return (
        <div className="flex-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="create">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;

