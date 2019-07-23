import { constants } from './constants';

export const entities = (state={}, action) => {
    const { result } = state;

    switch (action.type) {
        case constants.GETALL_REQUEST:
            return {
                requesting: true,
                options: action.options
            }
        case constants.GETALL_SUCCESS:
            return {
                requesting: false,
                result: action.result
            }
        case constants.GETALL_FAILURE:
            return {
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
                result: !!result ? [...result, action.result] : [action.result]
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
                updating: true,
                payload: action.payload,
                result: result.map(entity => 
                    entity.id === action.id ? {...entity, updating: true} : entity
                )
            }
        case constants.UPDATE_SUCCESS:
            return {
                ...state,
                updating: false,
                result: result.map(entity => 
                    entity.id === action.id ? {...entity, ...action.result, updating: false} : entity
                )
            }
        case constants.UPDATE_FAILURE:
            return {
                ...state,
                updating: false,
                error: action.error,
                result: result.map(entity => 
                    entity.id === action.id ? {...entity, updating: false, error: action.error} : entity
                )
            }
        case constants.REMOVE_REQUEST:
            return {
                ...state,
                removing: true,
                payload: action.payload,
                result: result.map(entity => 
                    entity.id === action.id ? {...entity, removing: true} : entity
                )
            }
        case constants.REMOVE_SUCCESS:
            return {
                ...state,
                removing: false,
                result: result.filter(item => item.id !== action.id)
            }
        case constants.REMOVE_FAILURE:
            return {
                ...state,
                removing: false,
                error: action.error,
                result: result.map(entity => 
                    entity.id === action.id ? {...entity, removing: false, error: action.error} : entity
                )
            }
        default:
            return state
    }
};
