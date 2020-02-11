import React, {Component} from 'react';
import "./Users.css";

const UserPage = ({user}) => {

    if (!user) {
        return (<div>User doesn't exist.</div>);
    }
    
    return (
        <div className='user-div'>
            <p>Name: <h2>{user.name}</h2></p>
            <p>Username: {user.username}</p>
        </div>
    )
}

export default UserPage