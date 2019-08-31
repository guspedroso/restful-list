import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import { ProviderWrapper } from '../../getProvider';
import { entityInfo } from '../../resources/Entity/constants';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const entities = {
        list: [],
        requesting: true,
    };

    ReactDOM.render(
        <ProviderWrapper>
            <List
                entityInfo={entityInfo}
                entities={entities}
            />
        </ProviderWrapper>, div);
    ReactDOM.unmountComponentAtNode(div);
});
