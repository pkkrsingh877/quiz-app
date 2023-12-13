import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const UserProfile = () => {

    const [user, setUser] = useState();

    useEffect(() => {
        // Split all cookies into an array
        const cookiesArray = document.cookie.split(';');

        // Find the "jwt" cookie
        const jwt = cookiesArray.find(cookie => cookie.trim().startsWith('jwt='));

        if (jwt) {
            // Extract the value of the "jwt" cookie
            const jwtToken = jwt.split('=')[1].trim();

            // Now you can use jwtToken
            console.log(jwtToken);
        }
    }, []);

    return (
        <div className="flex-container">
            <h2>Profile</h2>
            <div style={{ alignSelf: 'center' }}>
                <p><b>Name: </b>{user && user.name}</p>
                <p><b>Email: </b>{user && user.email}</p>
            </div>
        </div>
    );
}

export default UserProfile;