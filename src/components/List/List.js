import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { Item, Input, Filter, Action } from '../../components';
import ListModal from './ListModal';
import { entityInfoPropType, entitiesPropType } from '../../common/propTypes';
import './List.css';

const List = (props) => {
    const [ createView, setCreateView ] = useState(false);
    const [ payload, setPayload ] = useState({});
    const [ filterValue, setfilterValue ] = useState('');

    const { entityInfo, entities, valueAction, createAction, allowCreate } = props;
    const { list, requesting, created, creating, updating, removing, error, updated, removed } = entities;
    const { listTitle, filterType } = entityInfo;
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
    const handlePayload = e => setPayload({...payload, [e.target.name]: e.target.value});
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
                { !!listTitle &&
                <Row>
                    <Col className='list-row top'>
                        <h2>{listTitle}</h2>
                    </Col>
                </Row> }
                { !!filterType &&
                <Row>
                    <Col className='list-row top'>
                        <Filter setAction={setfilterValue} />
                    </Col>
                </Row> }
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
                .filter(item => !filterType || (!!item[filterType] && item[filterType].toLowerCase().includes(filterValue)))
                .map(item =>
                    <Row key={item.id}>
                        <Col className="list-row">
                            <Item
                                {...props}
                                item={item}
                                disabled={disabled}
                                updated={updated}
                                removed={removed}
                            />
                        </Col>
                    </Row>
                )}
                { !!allowCreate &&
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
                </Row> }
            </Container>
        </Fragment>
    );
}

List.propTypes = {
    entityInfo: entityInfoPropType,
    entities: entitiesPropType,
    valueAction: PropTypes.func,
    createAction: PropTypes.func,
    allowCreate: PropTypes.bool
};

List.defaultProps = {
    allowCreate: true
}

export default List;
