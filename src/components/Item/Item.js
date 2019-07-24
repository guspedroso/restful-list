import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'react-bootstrap';
import './Item.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {},
            updateView: false,
            removeView: false
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

    toggleRemove = () => {
        const { removeView } = this.state;
        this.setState({removeView: !removeView});
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
        const { updateView, removeView } = this.state;
        const { entityInfo, item, removeAction } = this.props;
        const { inputTypes, title } = entityInfo;

        return (
            <Modal show={updateView} onHide={this.toggleUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { !!inputTypes && inputTypes.map(inputType =>
                        <Form.Group key={`input-${inputType.name}`}>
                            <Form.Label>{inputType.label}</Form.Label>
                            <Form.Control 
                                type={inputType.type}
                                placeholder={inputType.placeholder}
                                name={inputType.name}
                                onChange={this.updatePayload}
                                defaultValue={item[inputType.name]}
                            />
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    { removeView ?
                    <Fragment>
                        <span className="padding-right">Are you sure you want to remove?</span>
                        <Button variant="secondary" onClick={this.toggleRemove}>
                            No
                        </Button>
                        <Button variant="primary" onClick={this.remove}>
                            Yes
                        </Button>
                    </Fragment> :
                    <Fragment>
                        { !!removeAction &&
                        <Button variant="danger" onClick={this.toggleRemove}>
                            Remove
                        </Button> }
                        <Button variant="secondary" onClick={this.toggleUpdate}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.update}>
                            Update
                        </Button>
                    </Fragment> }
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        const { item, updateAction, entityInfo } = this.props;
        const { inputTypes } = entityInfo;
        const { name } = item;

        return (
            <Fragment>
                {this.modal()}
                { !!inputTypes && inputTypes.map((inputType, index) =>
                    <span className="padding-right" key={inputType.name}>
                        {item[inputType.name]}
                    </span>
                )}
                { !!updateAction &&
                <Button className="pull-right" variant="primary" onClick={this.toggleUpdate}>Edit</Button> }
            </Fragment>
        );
    }
}

Item.propTypes = {
    entityInfo: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    updateAction: PropTypes.func,
    removeAction: PropTypes.func
};

Item.defaultProps = {
    item: {
        result: []
    }
};

export default Item;
