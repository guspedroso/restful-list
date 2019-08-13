import React, { Fragment, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Input from '../Input/Input';
import Action from '../Action/Action';
import './Item.css';

const Item = (props) => {
    const [ updateView, setUpdateView ] = useState(false);
    const [ payload, setPayload ] = useState({});

    const { entities = {}, item = {}, entityInfo = {}, valueAction, updateAction, removeAction, displayComponent,
            readOnly = false, useModal = true, hide = false, disabled = false  } = props;
    const { updating = false, removing = false, id } = item;
    const { updated = false, removed = false } = entities;
    const actionDisabled = disabled || updating || removing || !item.id || readOnly;

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

const ItemModal = (props) => {
    const { item = {}, entityInfo = {}, 
            handleUpdate, handleRemove, displayComponent,
            handleToggle, handlePayload, updateView = false,
            actionDisabled = false, readOnly = false } = props;
    const { title = '' } = entityInfo;

    return (
        <Modal show={updateView} onHide={handleToggle}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
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

export default Item;
