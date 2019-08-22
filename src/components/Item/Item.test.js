import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';
import { ProviderWrapper } from '../../getProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <ProviderWrapper>
            <Item />
        </ProviderWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});
