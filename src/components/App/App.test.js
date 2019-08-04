import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProviderWrapper } from '../../getProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ProviderWrapper>
        <App />
    </ProviderWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});
