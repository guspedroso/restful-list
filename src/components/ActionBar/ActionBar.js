import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'react-bootstrap';

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
        const { hide, open, disabled, createAction, updateAction, removeAction, toggle } = this.props;
        const { removeView } = this.state;

        return (
            <Fragment>
                { hide ? null :
                !open ?
                <Button variant="primary" onClick={toggle} disabled={disabled}>
                    Edit
                </Button> :
                removeView ?
                <Fragment>
                    <span className="padding-right">Are you sure you want to remove?</span>
                    <Button variant="secondary" onClick={this.toggleRemove}>
                        No
                    </Button>
                    <Button variant="primary" onClick={removeAction}>
                        Yes
                    </Button>
                </Fragment> :
                <Fragment>
                    { !!removeAction &&
                    <Button variant="danger" onClick={this.toggleRemove} disabled={disabled}>
                        Remove
                    </Button> }
                    <Button variant="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    { !!updateAction &&
                    <Button variant="primary" onClick={updateAction} disabled={disabled}>
                        Update
                    </Button> }
                    { !!createAction &&
                    <Button variant="primary" onClick={createAction} disabled={disabled}>
                        Create
                    </Button> }
                </Fragment> }
            </Fragment>
        );
    }
}

ActionBar.propTypes = {
    toggle: PropTypes.func,
    createAction: PropTypes.func,
    updateAction: PropTypes.func,
    removeAction: PropTypes.func,
    open: PropTypes.bool,
    hide: PropTypes.bool
};

ActionBar.defaultProps = {
    disabled: false,
    open: false,
    hide: false
};

export default ActionBar;
