import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Entity.css';

class EntityDisplay extends PureComponent {
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