import React from "react";
import AddUserPage from "../users/AddUserPage";
import "./Users.css";

export default function AddUser(props) {
    
    return (
        <AddUserPage
            formTitle="Add User"
            formSubmitButtonName="Add User"
            linkAfterSubmit="/users"
            currentUser={props.currentUser}
        />
    )
};