import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import { entityInfo } from '../../resources/Entity/constants';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const entities = {
        list: [],
        requesting: true,
    };

    ReactDOM.render(
        <List
            entityInfo={entityInfo}
            entities={entities}
        />, div);
    ReactDOM.unmountComponentAtNode(div);
});
