import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { entityInfoPropType } from '../../common/propTypes';

const Input = (props) => {
    const { item, entityInfo, readOnly, displayComponent } = props;

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

Input.propTypes = {
    entityInfo: entityInfoPropType,
    item: PropTypes.object.isRequired,
    readOnly: PropTypes.bool.isRequired,
    displayComponent: PropTypes.element
};

Input.defaultProps = {
    readOnly: false
};


const DefaultDisplayInput = (props) => {
    const { entityInfo, item, displayKey } = props;
    const { inputTypes } = entityInfo;

    return (
        inputTypes
        .filter(inputType => inputType.canShow === true)
        .map((inputType, index) =>
        <span className="padding-right" key={inputType[displayKey]}>
            {item[inputType[displayKey]]}
        </span>)
    );
}

DefaultDisplayInput.propTypes = {
    entityInfo: entityInfoPropType,
    item: PropTypes.object.isRequired,
    displayComponent: PropTypes.element,
    displayKey: PropTypes.string.isRequired
};

DefaultDisplayInput.defaultProps = {
    displayKey: 'name'
};


const EditInputTypes = (props) => {
    const { entityInfo, item, hideLabels, handlePayload } = props;
    const { inputTypes } = entityInfo;
    const { updating, removing } = item;
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

EditInputTypes.propTypes = {
    entityInfo: entityInfoPropType,
    item: PropTypes.object.isRequired,
    hideLabels: PropTypes.bool.isRequired,
    handlePayload: PropTypes.func.isRequired
};

EditInputTypes.defaultProps = {
    hideLabels: false
};


const TextInput = (props) => {
    const { inputType, item, hideLabel, handlePayload, disabled } = props;

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

TextInput.propTypes = {
    inputType: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    hideLabel: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    handlePayload: PropTypes.func.isRequired
};

TextInput.defaultProps = {
    hideLabel: false,
    disabled: false
};


export default Input;
