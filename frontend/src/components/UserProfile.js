import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { Link } from 'react-router-dom';

const UserProfile = () => {

    const [user, setUser] = useState();
    const { data, pending, error } = useFetch('http://localhost:8000/user/');

    useEffect(() => {
        if (data) {
            setUser(data);
            console.log(user);
        }
    }, [data, user]);

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