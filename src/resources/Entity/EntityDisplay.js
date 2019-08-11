import React, { Fragment } from 'react';
import './Entity.css';

const EntityDisplay = (props) => {
    const { item = {}, listView = false } = props;

    return (
        !item || !item.id ? null :
        <Fragment>
            { listView ?
            `${item.name}` :
            `${item.name}` }
        </Fragment>
    );
}

export default EntityDisplay;
