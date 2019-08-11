import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {
    const { item = {}, entityInfo = {}, readOnly = false, displayComponent } = props;

    return (
        readOnly ?
        <Fragment>
            {/* If custom display is passed in, use that.. otherwise just default view */}
            { !!displayComponent && React.isValidElement(displayComponent) ? 
            React.cloneElement(displayComponent, {item, entityInfo}) :
            <DisplayInputTypes {...props} /> }
        </Fragment> :
        <EditInputTypes {...props} />
    );
}

const DisplayInputTypes = (props) => {
    const { entityInfo = {}, item = {} } = props;
    const { inputTypes = [] } = entityInfo;

    return (
        inputTypes
        .filter(inputType => inputType.canShow === true)
        .map((inputType, index) =>
        <span className="padding-right" key={inputType.name}>
            {item[inputType.name]}
        </span>)
    );
}

const EditInputTypes = (props) => {
    const { entityInfo = {}, item = {}, hideLabels = false, payloadUpdate } = props;
    const { updating, removing } = item;
    const { inputTypes = [] } = entityInfo;

    return (
        inputTypes
        .filter(inputType => inputType.canEdit === true)
        .map(inputType =>
            inputType.type === 'text' ?
            <Form.Group key={`input-${inputType.name}`}>
                { !hideLabels &&
                <Form.Label>{inputType.label}</Form.Label> }
                <Form.Control 
                    type={inputType.type}
                    placeholder={inputType.placeholder}
                    name={inputType.name}
                    onChange={payloadUpdate}
                    defaultValue={item[inputType.name]}
                    disabled={updating || removing}
                />
            </Form.Group> :
            null
        )
    );
}

export default Input;
