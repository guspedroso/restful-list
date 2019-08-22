import React from 'react';
import ReactDOM from 'react-dom';
import { EntityItem, EntityList, EntityDisplay, EntityWrapper } from '../Entity';
import { ProviderWrapper } from '../../getProvider';

it('Entity Item renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <ProviderWrapper>
            <EntityItem />
        </ProviderWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Entity List renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <ProviderWrapper>
            <EntityList />
        </ProviderWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Entity Display renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <ProviderWrapper>
            <EntityDisplay />
        </ProviderWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Entity Wrapper renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <ProviderWrapper>
            <EntityWrapper />
        </ProviderWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});
