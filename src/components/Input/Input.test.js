import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';
import { entityInfo } from '../../resources/Entity/constants';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <Input 
            item={{}}
            entityInfo={entityInfo}
            handlePayload={() => {}}
        />, div);
  ReactDOM.unmountComponentAtNode(div);
});
