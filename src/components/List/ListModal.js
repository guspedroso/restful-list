import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { Input, Action } from '../../components';
import { entityInfoPropType } from '../../common/propTypes';
import './List.css';

const ListModal = (props) => {
    const { entityInfo, createView, disabled,
            handleCreate, handleToggle, handlePayload } = props;
    const { title } = entityInfo;

    return (
        <Modal show={createView} onHide={handleToggle}>
            <Modal.Header closeButton>
                <Modal.Title>Create {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input
                    item={{}}
                    entityInfo={entityInfo}
                    handlePayload={handlePayload}
                />
            </Modal.Body>
            <Modal.Footer>
                <Action
                    disabled={disabled}
                    handleCreate={handleCreate}
                    handleToggle={handleToggle}
                    open={createView}
                    outerClass='max-width'
                />
            </Modal.Footer>
        </Modal>
    );
}

ListModal.propTypes = {
    entityInfo: entityInfoPropType,
    createView: PropTypes.bool,
    disabled: PropTypes.bool,
    handleCreate: PropTypes.func,
    handleToggle: PropTypes.func,
    handlePayload: PropTypes.func
};

ListModal.defaultProps = {
    createView: false,
    disabled: false
};

export default ListModal;
