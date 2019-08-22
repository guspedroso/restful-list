import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import { ProviderWrapper } from '../../getProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <ProviderWrapper>
            <List />
        </ProviderWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});
