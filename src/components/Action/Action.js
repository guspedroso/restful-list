import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Action.css';

const Action = (props) => {
    const [removeView, setRemoveView] = useState(false);

    const { hide, open, disabled, toggleOnly, actionType, outerClass,
            handleCreate, handleUpdate, handleRemove, handleToggle } = props;

    const handleRemoveView = () => setRemoveView(!removeView);

    return (
        <div className={outerClass}>
            { hide ? null :
            !open || toggleOnly ?
            <Button className="action-button pull-right" variant="primary" onClick={handleToggle} disabled={disabled}>
                {actionType}
            </Button> :
            removeView ?
            <Container>
                <Row>
                    <Col className="action-col" xs='6' sm='7'>
                        Are you sure you want to remove?
                    </Col>
                    <Col className="action-col" xs='6' sm='5'>
                        <Button className="action-button pull-right" variant="primary" onClick={handleRemove} disabled={disabled}>
                            Yes
                        </Button>
                        <Button className="action-button pull-right" variant="secondary" onClick={handleRemoveView} disabled={disabled}>
                            No
                        </Button>
                    </Col>
                </Row>
            </Container> :
            <Container>
                <Row>
                    <Col className="action-col">
                        { !!handleUpdate &&
                        <Button className="action-button pull-right" variant="primary" onClick={handleUpdate} disabled={disabled}>
                            Update
                        </Button> }
                        { !!handleCreate &&
                        <Button className="action-button pull-right" variant="primary" onClick={handleCreate} disabled={disabled}>
                            Create
                        </Button> }
                        <Button className="action-button pull-right" variant="secondary" onClick={handleToggle} disabled={disabled}>
                            Cancel
                        </Button>
                        { !!handleRemove &&
                        <Button className="action-button pull-right" variant="danger" onClick={handleRemoveView} disabled={disabled}>
                            Remove
                        </Button> }
                    </Col>
                </Row>
            </Container> }
        </div>
    );
}

Action.propTypes = {
    hide: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    toggleOnly: PropTypes.bool.isRequired,
    actionType: PropTypes.string.isRequired,
    outerClass: PropTypes.string.isRequired,
    handleCreate: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleRemove: PropTypes.func,
    handleToggle: PropTypes.func
};

Action.defaultProps = {
    hide: false,
    open: false,
    disabled: false,
    toggleOnly: false,
    actionType: 'Edit',
    outerClass: ''
};

export default Action;
