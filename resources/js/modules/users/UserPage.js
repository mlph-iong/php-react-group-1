import React from 'react';
import "./Users.css";

const UserPage = ({user}) => {

    if (!user) {
        return (<div>User doesn't exist.</div>);
    }
    
    return (
        <div className='user-div'>
            Name: <h2>{user.name}</h2>
            <p>Username: {user.username}</p>
        </div>
    )
}

export default UserPage