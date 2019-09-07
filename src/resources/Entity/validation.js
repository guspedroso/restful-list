import { entityInfo, constants } from './constants';
import { isEmpty } from '../../common/helper';

export const validation = (requestType, payload) => {
    const { inputTypes } = entityInfo;

    switch (requestType) {
        case constants.GETBYID_REQUEST:
            return false;
        case constants.GETALL_REQUEST:
            return false;
        case constants.CREATE_REQUEST:
            // make sure all the required values are present
            const result = inputTypes.filter(item => item.required === true && !payload[item.name])
            if (result.length > 0) {
                // we can reduce and make it a comma delimited list of values missing
                return `Missing ${result[0].name}`
            }
            return false;
        case constants.UPDATE_REQUEST:
            if (isEmpty(payload)) {
                return `No values to update`
            }
            return false;
        case constants.REMOVE_REQUEST:
            return false;
        default:
            return false;
    }
};
