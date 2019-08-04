import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Entity.css';

class EntityDisplay extends Component {
    render() {
        const { item, listView } = this.props;

        return (
            <Fragment>
                { listView ?
                `${item.name}` :
                `${item.name}` }
            </Fragment>
        );
    }
}

EntityDisplay.propTypes = {
    entityInfo: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    listView: PropTypes.bool.isRequired // we can change how it should look in a list
};

EntityDisplay.defaultProps = {
    item: {},
    listView: false
};

export default EntityDisplay;
