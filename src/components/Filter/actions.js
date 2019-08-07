import { constants } from './constants';

const set = (filterValue) => dispatch => {
    dispatch({ type: constants.SET, filterValue });
};

export const actions = {
    set
};
