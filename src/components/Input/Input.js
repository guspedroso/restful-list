import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

class Input extends PureComponent {

    render() {
        const { item, entityInfo, updatePayload, readOnly, hideLabels, displayComponent } = this.props;
        const { inputTypes } = entityInfo;
        const { updating, removing } = item;

        return (
            <Fragment>
                { !inputTypes ? null :
                readOnly ?
                !!displayComponent && React.isValidElement(displayComponent) ? 
                React.cloneElement(displayComponent, {item, entityInfo}) :
                inputTypes
                .filter(inputType => inputType.canShow === true)
                .map((inputType, index) =>
                <span className="padding-right" key={inputType.name}>
                    {item[inputType.name]}
                </span>) :
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
                            onChange={updatePayload}
                            defaultValue={item[inputType.name]}
                            disabled={updating || removing}
                        />
                    </Form.Group> :
                    null
                )}
            </Fragment>
        );
    }
}

Input.propTypes = {
    entityInfo: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    updatePayload: PropTypes.func,
    readOnly: PropTypes.bool,
    displayComponent: PropTypes.element // allow the user to override and show the display in other ways
};

Input.defaultProps = {
    item: {},
    readOnly: false,
    hideLabels: false
};

export default Input;
