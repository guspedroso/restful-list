import React from 'react';
import ReactDOM from 'react-dom';
import { EntityItem } from './EntityItem';
import { EntityList } from './EntityList';
import { EntityDisplay, EntityWrapper } from '../Entity';
import { entityInfo } from '../../resources/Entity/constants';

it('Entity Item renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <EntityItem
          item={{}}
          entityInfo={entityInfo} 
        />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Entity List renders without crashing', () => {
  const div = document.createElement('div');
  const entities = {
    list: [],
    requesting: true,
  };
    
  ReactDOM.render(
        <EntityList
          entities={entities}
          entityInfo={entityInfo}
        />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Entity Display renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <EntityDisplay />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Entity Wrapper renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <EntityWrapper />, div);
  ReactDOM.unmountComponentAtNode(div);
});
