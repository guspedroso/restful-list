import { constants } from './constants';

export const entities = (state={}, action) => {
    const { list, item } = state;

    switch (action.type) {
        case constants.GETBYID_REQUEST:
            return {
                ...state,
                item: {
                    requesting: true
                }
            }
        case constants.GETBYID_SUCCESS:
            return {
                ...state,
                item: { 
                    requesting: false,
                    ...action.result
                }
            }
        case constants.GETBYID_FAILURE:
            return {
                ...state,
                item: {
                    requesting: false,
                    error: action.error
                }
            }
        case constants.GETALL_REQUEST:
            return {
                ...state,
                requesting: true,
                options: action.options
            }
        case constants.GETALL_SUCCESS:
            return {
                ...state,
                requesting: false,
                list: action.result
            }
        case constants.GETALL_FAILURE:
            return {
                ...state,
                requesting: false,
                error: action.error
            }
        case constants.CREATE_REQUEST:
            return {
                ...state,
                creating: true,
                payload: action.payload
            }
        case constants.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                list: !!list ? [...list, action.result] : [action.result]
            }
        case constants.CREATE_FAILURE:
            return {
                ...state,
                creating: false,
                error: action.error
            }
        case constants.UPDATE_REQUEST:
            return {
                ...state,
                list: !!list ? list.map(entity => 
                    entity.id === action.id ? {...entity, updating: true, payload: action.payload} : entity
                ) : [],
                item: !!item && item.id === action.id ? {...item, updating: true, payload: action.payload} : item
            }
        case constants.UPDATE_SUCCESS:
            return {
                ...state,
                list: !!list ? list.map(entity => 
                    entity.id === action.id ? {...entity, ...action.result, updating: false} : entity
                ) : [],
                item: !!item && item.id === action.id ? {...item, ...action.result, updating: false} : item
            }
        case constants.UPDATE_FAILURE:
            return {
                ...state,
                list: !!list ? list.map(entity => 
                    entity.id === action.id ? {...entity, updating: false, error: action.error} : entity
                ) : [],
                item: !!item && item.id === action.id ? {...item, updating: false, error: action.error} : item
            }
        case constants.REMOVE_REQUEST:
            return {
                ...state,
                list: !!list ? list.map(entity => 
                    entity.id === action.id ? {...entity, removing: true} : entity
                ) : [],
                item: !!item && item.id === action.id ? {...item, removing: true} : item
            }
        case constants.REMOVE_SUCCESS:
            return {
                ...state,
                list: list.filter(item => item.id !== action.id),
                item: !!item && item.id === action.id ? {} : item
            }
        case constants.REMOVE_FAILURE:
            return {
                ...state,
                list: !!list ? list.map(entity => 
                    entity.id === action.id ? {...entity, removing: false, error: action.error} : entity
                ) : [],
                item: !!item && item.id === action.id ? {...item,  removing: false, error: action.error} : item
            }
        default:
            return state
    }
};

/* These are all the possible values being set
    requesting: (bool)
    creating: (bool)
    error: (bool)
    options: (optional string for querying list)
    payload: (obj for creating item)
    item: (obj)
    {
        payload: (obj for updating item)
        requesting: (bool)
        removing: (bool)
        updating: (bool)
        error: (bool)
    },
    list: (array of obj)
    [
        {   
            payload: (obj for updating item)
            removing: (bool)
            updating: (bool)
            error: (bool)
        },
        ...
    ]  
*/
