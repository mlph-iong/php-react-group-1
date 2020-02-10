import React, { Component } from "react";

function InputValidationMessage(props) {
    let smallElement = "";
    if( props.message != null && props.message.length > 0 ) {
        smallElement =  <small className="text-danger">
                            { props.message }
                        </small>;
    } else {
        smallElement = props.message;
    }
    return (
        <div>   
            { smallElement }
        </div>
    );
}

export default InputValidationMessage;