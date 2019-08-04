import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import Item from '../Item/Item';
import Input from '../Input/Input';
import Action from '../Action/Action';
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
        const { title } = entityInfo;

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
                    <Action
                        createAction={createAction && this.create}
                        toggle={this.toggleCreate}
                        open={createView}
                        outerClass='max-width'
                    />
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        const { entityInfo, entities, createAction, updateAction, removeAction, displayComponent } = this.props;
        const { list, requesting, creating, updating, removing, error } = entities;
        const { listTitle } = entityInfo;
        const { createView } = this.state;
        const disabled = !!creating || !!updating || !!removing;

        return (
            <Fragment>
                {this.modal()}
                <Container>
                    <Row>
                        <Col className='list-row top'>
                            <h2>{listTitle}</h2>
                        </Col>
                    </Row>
                    { !!error || !!requesting ?
                    <Row>
                        <Col className={`list-row${!!error && ' error'}`}>
                            {!!error ? error : !!requesting ? 'Loading...' : listTitle}
                        </Col>
                    </Row> :
                    !!list && list.map(item =>
                        <Row key={item.id}>
                            <Col className="list-row">
                                <Item
                                    entityInfo={entityInfo}
                                    item={item}
                                    updateAction={updateAction}
                                    removeAction={removeAction}
                                    disabled={disabled}
                                    displayComponent={displayComponent}
                                />
                            </Col>
                        </Row>
                    )}
                    { !!createAction &&
                    <Row>
                        <Col>
                            <Action
                                actionType='Add'
                                createAction={createAction && this.create}
                                toggle={this.toggleCreate}
                                open={createView}
                                outerClass='pull-right top'
                                disabled={disabled}
                                toggleOnly={true}
                            />
                        </Col>
                    </Row> }
                </Container>
            </Fragment>
        );
    }
}

List.propTypes = {
    entityInfo: PropTypes.object.isRequired,
    entities: PropTypes.object.isRequired,
    createAction: PropTypes.func,
    updateAction: PropTypes.func,
    removeAction: PropTypes.func,
    displayComponent: PropTypes.element // allow the user to override and show the display in other ways
};

List.defaultProps = {
    entities: {},
    entityInfo: {}
};

export default List;
