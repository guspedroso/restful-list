import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputText from './InputText';
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
                <InputText
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

export default Input;
