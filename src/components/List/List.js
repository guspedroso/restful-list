import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import Item from '../Item/Item';
import Input from '../Input/Input';
import Filter from '../Filter/Filter';
import Action from '../Action/Action';
import './List.css';

const List = (props) => {
    const [ createView, createViewToggle ] = useState(false);
    const [ payload, payloadUpdate ] = useState({});
    const { entityInfo = {}, entities = {}, setValueAction, createAction } = props;
    const { list = [], requesting = false, created = false, creating = false, updating = false, removing = false, error } = entities;
    const { listTitle } = entityInfo;
    const disabled = !!creating || !!updating || !!removing;

    useEffect(() => {
        // reset the payload anytime they toggle the modal view
        payloadUpdate({});
    }, [createView]);

    useEffect(() => {
        // if it was created successfully then we close the modal
        if (created) {
            if (createView) {
                createViewToggle(false);
            }
            setValueAction('created', false);
        }
    }, [created, setValueAction, createView]);

    return (
        <Fragment>
            <ListModal 
                {...props}
                createView={createView}
                createViewToggle={createViewToggle}
                payload={payload}
                payloadUpdate={payloadUpdate} 
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
                { !!createAction &&
                <Row>
                    <Col>
                        <Action
                            actionType='Add'
                            createAction={() => createAction(payload)}
                            toggle={() => createViewToggle(!createView)}
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

const ListModal = (props) => {
    const { entityInfo = {}, createAction, createView, 
            createViewToggle, payloadUpdate, payload } = props;
    const { title } = entityInfo;

    return (
        <Modal show={createView} onHide={() => createViewToggle(!createView)}>
            <Modal.Header closeButton>
                <Modal.Title>Create {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input
                    entityInfo={entityInfo}
                    payloadUpdate={e => payloadUpdate({...payload, [e.target.name]: e.target.value})}
                />
            </Modal.Body>
            <Modal.Footer>
                <Action
                    createAction={() => createAction(payload)}
                    toggle={() => createViewToggle(!createView)}
                    open={createView}
                    outerClass='max-width'
                />
            </Modal.Footer>
        </Modal>
    );
}

export default List;
