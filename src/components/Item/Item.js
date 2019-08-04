import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Input from '../Input/Input';
import Action from '../Action/Action';
import './Item.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {},
            updateView: props.updateView
        };
    }

    updatePayload = (event) => {
        const { name, value } = event.target;
        const { payload } = this.state;

        this.setState({
            payload: {
                ...payload,
                [name]: value
            }
        });
    }

    toggleUpdate = () => {
        const { updateView } = this.state;
        this.setState({
            updateView: !updateView,
            payload: {}
        });
    }

    update = () => {
        const { payload } = this.state;
        const { item, updateAction } = this.props;
        const { id } = item;

        if (id && payload) {
            updateAction(id, payload);
            this.toggleUpdate();
        }
    }

    remove = () => {
        const { item, removeAction } = this.props;
        const { id } = item;

        if (id) {
            removeAction(id);
            this.toggleUpdate();
        }
    }

    modal = () => {
        const { updateView } = this.state;
        const { entityInfo, item, removeAction, readOnly, updateAction, displayComponent } = this.props;
        const { title } = entityInfo;
        const disabled = !item.id || readOnly;

        return (
            <Modal show={updateView} onHide={this.toggleUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        item={item}
                        entityInfo={entityInfo}
                        readOnly={readOnly}
                        updatePayload={this.updatePayload}
                        displayComponent={displayComponent}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Action
                        disabled={disabled}
                        updateAction={updateAction && this.update}
                        removeAction={removeAction && this.remove}
                        toggle={this.toggleUpdate}
                        open={updateView}
                        outerClass='max-width'
                    />
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        const { item, updateAction, removeAction, entityInfo, 
                readOnly, useModal, hideAction, disabled, displayComponent } = this.props;
        const { updateView } = this.state;
        const { updating, removing } = item;

        return (
            <Fragment>
                {useModal && this.modal()}
                <Input
                    item={item}
                    entityInfo={entityInfo}
                    readOnly={useModal || (!useModal && !updateView)}
                    updatePayload={this.updatePayload}
                    displayComponent={displayComponent}
                />
                <Action
                    hide={!item.id || hideAction}
                    disabled={disabled || updating || removing || !item.id || readOnly}
                    updateAction={updateAction && this.update}
                    removeAction={removeAction && this.remove}
                    toggle={this.toggleUpdate}
                    open={updateView}
                    toggleOnly={useModal}
                    outerClass='pull-right'
                />
            </Fragment>
        );
    }
}

Item.propTypes = {
    entityInfo: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    updateAction: PropTypes.func,
    removeAction: PropTypes.func,
    readOnly: PropTypes.bool, // the values will only be displayed and not editable
    useModal: PropTypes.bool, // if set to false, the input to update entity will be inline 
    disabled: PropTypes.bool, // should we disable the input and buttons
    displayComponent: PropTypes.element // allow the user to override and show the display in other ways
};

Item.defaultProps = {
    item: {},
    entityInfo: {},
    readOnly: false,
    updateView: false,
    useModal: true,
    hideAction: false,
    disabled: false
};

export default Item;
