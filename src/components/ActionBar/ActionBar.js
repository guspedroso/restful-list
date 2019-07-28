import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './ActionBar.css';

class ActionBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            removeView: false
        };
    }

    toggleRemove = () => {
        const { removeView } = this.state;
        this.setState({removeView: !removeView});
    }

    render() {
        const { hide, open, disabled, createAction, updateAction, 
                removeAction, toggle, toggleOnly, actionType, outerClass } = this.props;
        const { removeView } = this.state;

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
                            <Button className="action-button pull-right" variant="secondary" onClick={this.toggleRemove}>
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
                            <Button className="action-button pull-right" variant="danger" onClick={this.toggleRemove} disabled={disabled}>
                                Remove
                            </Button> }
                        </Col>
                    </Row>
                </Container> }
            </div>
        );
    }
}

ActionBar.propTypes = {
    toggle: PropTypes.func,
    createAction: PropTypes.func,
    updateAction: PropTypes.func,
    removeAction: PropTypes.func,
    disabled: PropTypes.bool,
    open: PropTypes.bool,
    hide: PropTypes.bool,
    toggleOnly: PropTypes.bool,
    actionName: PropTypes.string,
    outerClass: PropTypes.string
};

ActionBar.defaultProps = {
    disabled: false,
    open: false,
    hide: false,
    toggleOnly: false,
    actionType: 'Edit',
    outerClass: ''
};

export default ActionBar;
