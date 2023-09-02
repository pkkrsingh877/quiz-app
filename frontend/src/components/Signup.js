import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            if (!response.ok) {
                throw new Error('Data could not be saved!');
            }
            navigate('/user/profile');
        } catch (error) {
            navigate('/notfound');
        }
    };

    return (
        <div className="flex-container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup} className="create">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;