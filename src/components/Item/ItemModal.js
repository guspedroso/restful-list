import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { Input, Action } from '../../components';
import { entityInfoPropType } from '../../common/propTypes';
import './Item.css';

const ItemModal = (props) => {
    const { item, entityInfo, handleUpdate, handleRemove, displayComponent,
            handleToggle, handlePayload, updateView, actionDisabled, readOnly } = props;
    const { title } = entityInfo;

    return (
        <Modal show={updateView} onHide={handleToggle}>
            { !!title &&
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header> }
            <Modal.Body>
                <Input
                    item={item}
                    entityInfo={entityInfo}
                    readOnly={readOnly}
                    handlePayload={handlePayload}
                    displayComponent={displayComponent}
                />
            </Modal.Body>
            <Modal.Footer>
                <Action
                    disabled={actionDisabled}
                    handleUpdate={handleUpdate}
                    handleRemove={handleRemove}
                    handleToggle={handleToggle}
                    open={updateView}
                    outerClass='max-width'
                />
            </Modal.Footer>
        </Modal>
    );
}

ItemModal.propTypes = {
    entityInfo: entityInfoPropType,
    item: PropTypes.object.isRequired,
    handleToggle: PropTypes.func,
    handlePayload: PropTypes.func,
    removeAction: PropTypes.func,
    displayComponent: PropTypes.element,
    readOnly: PropTypes.bool,
    updateView: PropTypes.bool,
    actionDisabled: PropTypes.bool
};

ItemModal.defaultProps = {
    readOnly: false,
    updateView: false,
    actionDisabled: false
};

export default ItemModal;
