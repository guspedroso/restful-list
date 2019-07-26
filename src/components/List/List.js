import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Item from '../Item/Item';
import Input from '../Input/Input';
import ActionBar from '../ActionBar/ActionBar';
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
        const { entityInfo, createAction } = this.props;
        const { inputTypes, title } = entityInfo;

        return (
            <Modal show={createView} onHide={this.toggleCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        entityInfo={entityInfo}
                        updatePayload={this.updatePayload}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <ActionBar
                        createAction={createAction && this.create}
                        toggle={this.toggleCreate}
                        open={createView}
                    />
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        const { entityInfo, list, createAction, updateAction, removeAction,
                requesting, creating, error } = this.props;
        const { listTitle } = entityInfo;
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
                    { !!error ?
                    <Row>
                        <Col className="list-row error" md={colStyle}>
                            {error}
                        </Col>
                    </Row> :
                    requesting ?
                    <Row>
                        <Col className="list-row" md={colStyle}>
                            Loading...
                        </Col>
                    </Row> :
                    !!list && list.map(item =>
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
                            <Button 
                                className="pull-right top" 
                                variant="primary"
                                onClick={this.toggleCreate}
                                disabled={creating}
                            >
                                Add
                            </Button>
                        </Col>
                    </Row> }
                </Container>
            </Fragment>
        );
    }
}

List.propTypes = {
    entityInfo: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired,
    createAction: PropTypes.func,
    updateAction: PropTypes.func,
    removeAction: PropTypes.func,
    requesting: PropTypes.bool,
    creating: PropTypes.bool,
    error: PropTypes.string,
};

List.defaultProps = {
    list: [],
    requesting: true,
    creating: false
};

export default List;
