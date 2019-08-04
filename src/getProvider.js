import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';

export const ProviderWrapper = props => {
  return <Provider store={configureStore()}>{props.children}></Provider>;
};
