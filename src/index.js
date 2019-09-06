import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.css';
import { ProviderWrapper } from './getProvider';

ReactDOM.render(
    <ProviderWrapper>
        <App />
    </ProviderWrapper>, document.getElementById('root'));
