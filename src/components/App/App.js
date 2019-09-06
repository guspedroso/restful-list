import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { EntityList } from '../../resources/Entity';
import './App.css';

const App = () => {
  return (
    <Provider store={configureStore()}>
        <div className="App">
            {/* <EntityItem id='asdf' /> */}
            <EntityList />
        </div>
    </Provider>
  );
}

export default App;
