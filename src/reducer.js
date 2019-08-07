import { combineReducers } from 'redux';
import { entities } from './resources/Entity/reducer';
import { filter } from './components/Filter/reducer';

export default combineReducers({
    entities,
    filter
});
