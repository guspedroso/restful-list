import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { Input, Action } from '../../components';
import { entityInfoPropType } from '../../common/propTypes';
import './Item.css';

const Item = (props) => {
    const [ updateView, setUpdateView ] = useState(false);
    const [ payload, setPayload ] = useState({});

    const { item, entityInfo, valueAction, updateAction, removeAction,
            displayComponent, readOnly, useModal, hide, disabled, updated, removed } = props;
    const { updating, removing, id } = item;
    const actionDisabled = !id || disabled || updating || removing || readOnly;

    useEffect(() => {
        // reset the payload anytime they toggle the modal view
        setPayload({});
    }, [updateView]); 

    useEffect(() => {
        // if it was updated successfully then we close the modal
        if (updated) {
            if (updateView) {
                setUpdateView(false);
            }
            valueAction('updated', false);
        } else if (removed) {
            if (updateView) {
                setUpdateView(false);
            }
            valueAction('removed', false);
        }
    }, [updated, removed, updateView, valueAction]);

    const handleUpdate = () => updateAction(id, payload);
    const handleRemove = () => removeAction(id);
    const handlePayload = event => setPayload({...payload, [event.target.name]: event.target.value});
    const handleToggle = () => setUpdateView(!updateView);

    return (
        <Fragment>
            { useModal && 
            <ItemModal 
                {...props}
                updateView={updateView}
                payload={payload}
                handleToggle={handleToggle}
                handleUpdate={handleUpdate}
                handleRemove={handleRemove}
                handlePayload={handlePayload} 
                actionDisabled={actionDisabled}
            /> }
            <Input
                item={item}
                entityInfo={entityInfo}
                readOnly={useModal || (!useModal && !updateView)}
                handlePayload={handlePayload}
                displayComponent={displayComponent}
            />
            <Action
                hide={!item.id || hide}
                disabled={actionDisabled}
                handleUpdate={handleUpdate}
                handleRemove={handleRemove}
                handleToggle={handleToggle}
                open={updateView}
                toggleOnly={useModal}
                outerClass='pull-right'
            />
        </Fragment>
    );
}

Item.propTypes = {
    entityInfo: entityInfoPropType,
    item: PropTypes.object.isRequired,
    valueAction: PropTypes.func,
    updateAction: PropTypes.func,
    removeAction: PropTypes.func,
    displayComponent: PropTypes.element,
    readOnly: PropTypes.bool,
    useModal: PropTypes.bool,
    hide: PropTypes.bool,
    disabled: PropTypes.bool,
    updated: PropTypes.bool,
    removed: PropTypes.bool
};

Item.defaultProps = {
    readOnly: false,
    useModal: true,
    hide: false,
    disabled: false,
    updated: false,
    removed: false
};

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

export default Item;
