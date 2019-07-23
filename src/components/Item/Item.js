import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'react-bootstrap';
import './Item.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {},
            updateView: false
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

    modal = () => {
        const { updateView } = this.state;
        const { item } = this.props;
        const { name } = item;

        return (
            <Modal show={updateView} onHide={this.toggleUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Entity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name="name" onChange={this.updatePayload} defaultValue={name}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.toggleUpdate}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={this.update}>
                    Update
                  </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        const { item, updateAction } = this.props;
        const { name } = item;

        return (
            <Fragment>
                {this.modal()}
                {name}
                { !!updateAction &&
                <Button className="pull-right" variant="primary" onClick={this.toggleUpdate}>Edit</Button> }
            </Fragment>
        );
    }
}

Item.propTypes = {
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
