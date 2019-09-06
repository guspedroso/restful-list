import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const InputText = (props) => {
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

InputText.propTypes = {
    inputType: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    hideLabel: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    handlePayload: PropTypes.func.isRequired
};

InputText.defaultProps = {
    hideLabel: false,
    disabled: false
};

export default InputText;
