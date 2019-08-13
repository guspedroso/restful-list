import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import Item from '../Item/Item';
import Input from '../Input/Input';
import Filter from '../Filter/Filter';
import Action from '../Action/Action';
import './List.css';

const List = (props) => {
    const [ createView, setCreateView ] = useState(false);
    const [ payload, setPayload ] = useState({});

    const { entityInfo = {}, entities = {}, valueAction, createAction } = props;
    const { list = [], requesting = false, created = false, creating = false, updating = false, removing = false, error } = entities;
    const { listTitle } = entityInfo;
    const disabled = creating || updating || removing;

    useEffect(() => {
        // reset the payload anytime they toggle the modal view
        setPayload({});
    }, [createView]);

    useEffect(() => {
        // if it was created successfully then we close the modal
        if (created) {
            if (createView) {
                setCreateView(false);
            }
            valueAction('created', false);
        }
    }, [created, createView, valueAction]);

    const handleCreate = () => createAction(payload);
    const handlePayload = event => setPayload({...payload, [event.target.name]: event.target.value});
    const handleToggle = () => setCreateView(!createView);

    return (
        <Fragment>
            <ListModal
                disabled={disabled}
                entityInfo={entityInfo}
                createView={createView}
                handleCreate={handleCreate}
                handleToggle={handleToggle}
                handlePayload={handlePayload} 
            />
            <Container>
                <Row>
                    <Col className='list-row top'>
                        <h2>{listTitle}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className='list-row top'>
                        <Filter/>
                    </Col>
                </Row>
                { !!error &&
                <Row>
                    <Col className={`list-row error`}>
                        {error}
                    </Col>
                </Row> }
                { !!requesting ?
                <Row>
                    <Col className={`list-row`}>
                        {'Loading...'}
                    </Col>
                </Row> :
                !!list && list
                .map(item =>
                    <Row key={item.id}>
                        <Col className="list-row">
                            <Item
                                {...props}
                                item={item}
                                disabled={disabled}
                            />
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col>
                        <Action
                            actionType='Add'
                            handleCreate={handleCreate}
                            handleToggle={handleToggle}
                            open={createView}
                            outerClass='pull-right top'
                            disabled={disabled}
                            toggleOnly={true}
                        />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

const ListModal = (props) => {
    const { entityInfo = {}, createView = false, disabled = false,
            handleCreate, handleToggle, handlePayload } = props;
    const { title } = entityInfo;

    return (
        <Modal show={createView} onHide={handleToggle}>
            <Modal.Header closeButton>
                <Modal.Title>Create {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input
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

export default List;
