import React from 'react';
import ServiceAddEdit from "../service/ServiceAddEdit"

export default function ServiceAdd(props) {
    return (
        <ServiceAddEdit
            formTitle="Add Service"
            history={props.history}
        />
    )
}