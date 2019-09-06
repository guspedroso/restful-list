import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';
import { entityInfo } from '../../resources/Entity/constants';

it('renders without crashing', () => {
    const div = document.createElement('div');

    const item = {};

    ReactDOM.render(
        <Item
            item={item}
            entityInfo={entityInfo}
        />, div);
    ReactDOM.unmountComponentAtNode(div);
});
