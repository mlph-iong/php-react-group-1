import React from "react";
import AddUserPage from "../users/AddUserPage";
import "./Users.css";

export default function AddUser() {
    return (
        <AddUserPage
            formTitle="Add User"
            formSubmitButtonName="Add User"
            linkAfterSubmit="/user"
        />
    )
};