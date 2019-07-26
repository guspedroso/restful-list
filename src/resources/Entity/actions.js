import { constants } from './constants';
import { service } from './service';

const getById = (id) => {
    const request = (id) => { return { type: constants.GETBYID_REQUEST, id } };
    const success = (result) => { return { type: constants.GETBYID_SUCCESS, result } };
    const failure = (error) => { return { type: constants.GETBYID_FAILURE, error } };

    return dispatch => {
        dispatch(request(id));
        service.getById(id).then(
            result => dispatch(success(result)),
            error => dispatch(failure(error))
        );
    }
};

const getAll = (options) => {
    const request = (options) => { return { type: constants.GETALL_REQUEST, options } };
    const success = (result) => { return { type: constants.GETALL_SUCCESS, result } };
    const failure = (error) => { return { type: constants.GETALL_FAILURE, error } };

    return dispatch => {
        dispatch(request(options));
        service.getAll(options).then(
            result => dispatch(success(result)),
            error => dispatch(failure(error))
        );
    }
};

const create = (payload) => {
    const request = (payload) => { return { type: constants.CREATE_REQUEST, payload } };
    const success = (result) => { return { type: constants.CREATE_SUCCESS, result } };
    const failure = (error) => { return { type: constants.CREATE_FAILURE, error } };

    return dispatch => {
        dispatch(request(payload));
        service.create(payload).then(
            result => dispatch(success(result)),
            error => dispatch(failure(error))
        );
    }
};

const update = (id, payload) => {
    const request = (id, payload) => { return { type: constants.UPDATE_REQUEST, id, payload } };
    const success = (id, result) => { return { type: constants.UPDATE_SUCCESS, id, result } };
    const failure = (id, error) => { return { type: constants.UPDATE_FAILURE, id, error } };

    return dispatch => {
        dispatch(request(id, payload));
        service.update(id, payload).then(
            result => dispatch(success(id, result)),
            error => dispatch(failure(id, error))
        );
    }
};

const remove = (id) => {
    const request = (id) => { return { type: constants.REMOVE_REQUEST, id } };
    const success = (id, result) => { return { type: constants.REMOVE_SUCCESS, id, result } };
    const failure = (id, error) => { return { type: constants.REMOVE_FAILURE, id, error } };

    return dispatch => {
        dispatch(request(id));
        service.remove(id).then(
            result => dispatch(success(id, result)),
            error => dispatch(failure(id, error))
        );
    }
};

export const actions = {
    getById,
    getAll,
    create,
    update,
    remove
};
