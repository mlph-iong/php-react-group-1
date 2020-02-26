import React from 'react';
import ServiceAddEdit from './ServiceAddEdit';

export default function ServiceEdit(props) {
    return (
        <ServiceAddEdit
            formTitle="Edit Service"
            match={props.match}
            history={props.history}
        />
    )
}