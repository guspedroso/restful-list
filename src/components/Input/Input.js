import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {
    const { item = {}, entityInfo = {},
            readOnly = false, displayComponent } = props;

    return (
        readOnly ?
        <Fragment>
            {/* If custom display is passed in, use that.. otherwise just default view */}
            { !!displayComponent && React.isValidElement(displayComponent) ? 
            React.cloneElement(displayComponent, {item, entityInfo}) :
            <DefaultDisplayInput {...props} /> }
        </Fragment> :
        <EditInputTypes {...props} />
    );
}

const DefaultDisplayInput = (props) => {
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
    const { entityInfo = {}, item = {}, 
            hideLabels = false, handlePayload } = props;
    const { inputTypes = [] } = entityInfo;
    const { updating = false, removing = false } = item;
    const disabled = updating || removing;

    return (
        inputTypes
        .filter(inputType => inputType.canEdit === true)
        .map((inputType, index) =>
            <Fragment key={`${inputType.type}-${index}`}>
                { inputType.type === 'text' ?
                <TextInput
                    handlePayload={handlePayload}
                    item={item}
                    inputType={inputType}
                    hideLabel={hideLabels}
                    disabled={disabled}
                /> :
                null }
            </Fragment>
        )
    );
}

const TextInput = (props) => {
    const { inputType = {}, item = {}, hideLabel = false,
            handlePayload, disabled = false } = props;

    return (
        <Form.Group>
            { !hideLabel &&
            <Form.Label>{inputType.label}</Form.Label> }
            <Form.Control 
                type={inputType.type}
                placeholder={inputType.placeholder}
                name={inputType.name}
                onChange={handlePayload}
                defaultValue={item[inputType.name]}
                disabled={disabled}
            />
        </Form.Group>
    );
}

export default Input;
