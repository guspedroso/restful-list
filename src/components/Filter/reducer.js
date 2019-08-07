import { constants } from './constants';

export const filter = (state={}, action) => {
    switch (action.type) {
        case constants.SET:
            return {
                filterValue: action.filterValue
            }
        default:
            return state
    }
};
