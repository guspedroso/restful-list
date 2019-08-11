import React, { Fragment, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Input from '../Input/Input';
import Action from '../Action/Action';
import './Item.css';

const Item = (props) => {
    const [ updateView, updateViewToggle ] = useState(false);
    const [ payload, payloadUpdate ] = useState({});
    const { item = {}, entityInfo = {}, updateAction, removeAction, displayComponent,
            readOnly = false, useModal = true, hideAction = false, disabled = false  } = props;
    const { updating, removing, id } = item;

    useEffect(() => {
        // reset the payload anytime they toggle the modal view
        payloadUpdate({});
    }, [updateView]); 

    return (
        <Fragment>
            { useModal && 
            <ItemModal 
                {...props}
                updateView={updateView}
                updateViewToggle={updateViewToggle}
                payload={payload}
                payloadUpdate={payloadUpdate} 
            /> }
            <Input
                item={item}
                entityInfo={entityInfo}
                readOnly={useModal || (!useModal && !updateView)}
                updatePayload={e => payloadUpdate({...payload, [e.target.name]: e.target.value})}
                displayComponent={displayComponent}
            />
            <Action
                hide={!item.id || hideAction}
                disabled={disabled || updating || removing || !item.id || readOnly}
                updateAction={() => {
                    updateAction(id, payload);
                    updateViewToggle(!updateView);
                }}
                removeAction={() => {
                    removeAction(id);
                    updateViewToggle(!updateView);
                }}
                toggle={() => updateViewToggle(!updateView)}
                open={updateView}
                toggleOnly={useModal}
                outerClass='pull-right'
            />
        </Fragment>
    );
}

const ItemModal = (props) => {
    const { item = {}, entityInfo = {}, updateAction, removeAction, displayComponent,
            readOnly = false, disabled = false,
            payloadUpdate, updateViewToggle, updateView, payload } = props;
    const { updating, removing, id } = item;
    const { title = '' } = entityInfo;

    return (
        <Modal show={updateView} onHide={() => updateViewToggle(!updateView)}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input
                    item={item}
                    entityInfo={entityInfo}
                    readOnly={readOnly}
                    updatePayload={e => payloadUpdate({...payload, [e.target.name]: e.target.value})}
                    displayComponent={displayComponent}
                />
            </Modal.Body>
            <Modal.Footer>
                <Action
                    disabled={disabled || updating || removing || !item.id || readOnly}
                    updateAction={() => {
                        updateAction(id, payload);
                        updateViewToggle(!updateView);
                    }}
                    removeAction={() => {
                        removeAction(id);
                        updateViewToggle(!updateView);
                    }}
                    toggle={() => updateViewToggle(!updateView)}
                    open={updateView}
                    outerClass='max-width'
                />
            </Modal.Footer>
        </Modal>
    );
}

export default Item;
