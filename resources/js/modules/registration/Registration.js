import React from "react";
import AddUserPage from "../users/AddUserPage";
import "./Registration.css";

export default function Registration() {
    return (
        <AddUserPage
            formTitle="Register"
            formSubmitButtonName="Register!"
            linkAfterSubmit="/login"
        />
    )
};