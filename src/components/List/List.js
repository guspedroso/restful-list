import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Item from '../Item/Item';
import './List.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {},
            createView: false
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

    toggleCreate = () => {
        const { createView } = this.state;
        this.setState({
            createView: !createView,
            payload: {}
        });
    }

    create = () => {
        const { payload } = this.state;
        const { createAction } = this.props;

        if (payload) {
            createAction(payload);
            this.toggleCreate();
        }
    }

    modal = () => {
        const { createView } = this.state;
        const { entityInfo } = this.props;
        const { inputTypes, title } = entityInfo;

        return (
            <Modal show={createView} onHide={this.toggleCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create {title}</Modal.Title>
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
                            />
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleCreate}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.create}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        const { entityInfo, list, createAction, updateAction, removeAction } = this.props;
        const { listTitle } = entityInfo;
        const { result } = list;
        const colStyle = { span: 6, offset: 3 };

        return (
            <Fragment>
                {this.modal()}
                <Container>
                    <Row>
                        <Col className="list-row top" md={colStyle}>
                            <h2>{listTitle}</h2>
                        </Col>
                    </Row>
                    { !!result && result.map(item =>
                        <Row key={item.id}>
                            <Col className="list-row" md={colStyle}>
                                <Item
                                    entityInfo={entityInfo}
                                    item={item}
                                    updateAction={updateAction}
                                    removeAction={removeAction}
                                />
                            </Col>
                        </Row>
                    )}
                    { !!createAction &&
                    <Row>
                        <Col md={colStyle}>
                            <Button className="pull-right top" variant="primary" onClick={this.toggleCreate}>Add</Button>
                        </Col>
                    </Row> }
                </Container>
            </Fragment>
        );
    }
}

List.propTypes = {
    entityInfo: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    createAction: PropTypes.func,
    updateAction: PropTypes.func,
    removeAction: PropTypes.func
};

List.defaultProps = {
    list: {
        result: []
    }
};

export default List;
