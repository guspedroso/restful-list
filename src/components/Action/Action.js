import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Action.css';

const Action = (props) => {
    const [removeView, updateRemoveView] = useState(false);
    const { hide = false, open = false, disabled = false,
            toggleOnly = false, actionType = 'Edit', outerClass = '',
            createAction, updateAction, removeAction, toggle } = props;

    return (
        <div className={outerClass}>
            { hide ? null :
            !open || toggleOnly ?
            <Button className="action-button pull-right" variant="primary" onClick={toggle} disabled={disabled}>
                {actionType}
            </Button> :
            removeView ?
            <Container>
                <Row>
                    <Col className="action-col" xs='6' sm='7'>
                        Are you sure you want to remove?
                    </Col>
                    <Col className="action-col" xs='6' sm='5'>
                        <Button className="action-button pull-right" variant="primary" onClick={removeAction}>
                            Yes
                        </Button>
                        <Button className="action-button pull-right" variant="secondary" onClick={() => updateRemoveView(!removeView)}>
                            No
                        </Button>
                    </Col>
                </Row>
            </Container> :
            <Container>
                <Row>
                    <Col className="action-col">
                        { !!updateAction &&
                        <Button className="action-button pull-right" variant="primary" onClick={updateAction} disabled={disabled}>
                            Update
                        </Button> }
                        { !!createAction &&
                        <Button className="action-button pull-right" variant="primary" onClick={createAction} disabled={disabled}>
                            Create
                        </Button> }
                        <Button className="action-button pull-right" variant="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                        { !!removeAction &&
                        <Button className="action-button pull-right" variant="danger" onClick={() => updateRemoveView(!removeView)} disabled={disabled}>
                            Remove
                        </Button> }
                    </Col>
                </Row>
            </Container> }
        </div>
    );
}

export default Action;
