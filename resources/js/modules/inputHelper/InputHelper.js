import React, { Component } from "react";
import InputValidationMessage from "../validationHelper/validationHelper";

function InputHelper(props) {
    return (
        <div className="form-group">
            <label htmlFor={ props.name }>{ props.label }</label>
            <input
                type={ props.type }
                className={"form-control " + props.className }
                name={ props.name }
                placeholder={ props.placeholder }
                value={ props.value }
                onChange={ props.onChange }
            />
            <InputValidationMessage message={ props.errorMessage } />
        </div>
    );
}

export default InputHelper;