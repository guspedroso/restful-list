import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

class Input extends Component {

    render() {
        const { item, updatePayload, entityInfo, readOnly, hideLabels } = this.props;
        const { inputTypes } = entityInfo;
        const { updating, removing } = item;

        return (
            <Fragment>
                { !inputTypes ? null :
                readOnly ?
                inputTypes
                .filter(inputType => inputType.showInDisplayView === true)
                .map((inputType, index) =>
                <span className="padding-right" key={inputType.name}>
                    {item[inputType.name]}
                </span>) :
                inputTypes.map(inputType =>
                    <Form.Group key={`input-${inputType.name}`}>
                        { !hideLabels &&
                        <Form.Label>{inputType.label}</Form.Label> }
                        { readOnly ?
                        <div>
                            {item[inputType.name]}
                        </div> :
                        <Form.Control 
                            type={inputType.type}
                            placeholder={inputType.placeholder}
                            name={inputType.name}
                            onChange={updatePayload}
                            defaultValue={item[inputType.name]}
                            disabled={updating || removing}
                        /> }
                    </Form.Group>
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
};

Input.defaultProps = {
    item: {},
    readOnly: false,
    hideLabels: false
};

export default Input;
