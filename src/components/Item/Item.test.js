import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';
import { ProviderWrapper } from '../../getProvider';
import { entityInfo } from '../../resources/Entity/constants';

it('renders without crashing', () => {
    const div = document.createElement('div');

    const item = {

    };

    ReactDOM.render(
        <ProviderWrapper>
            <Item
                item={item}
                entityInfo={entityInfo}
            />
        </ProviderWrapper>, div);
    ReactDOM.unmountComponentAtNode(div);
});
