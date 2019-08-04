import React from 'react';
import ReactDOM from 'react-dom';
import Action from './Action';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <Action />, div);
  ReactDOM.unmountComponentAtNode(div);
});
