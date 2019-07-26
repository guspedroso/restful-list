/*import { authHeader, handleResponse, handleError } from '../../common/helper';
import { config } from '../../common/config';
import { entityInfo } from './constants';*/

const getById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                {id: id, name: 'Entity By Id'}
            );
        }, 1000);
    });

    // TODO: uncomment when backend is ready
    /*const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/${entityInfo.apiEntityType}/${id}`, requestOptions)
        .then(handleResponse)
        .catch(handleError);*/
}

const getAll = (options) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                [
                    {id: `${Date.now()}-1`, name: 'Entity 1'},
                    {id: `${Date.now()}-2`, name: 'Entity 2'},
                    {id: `${Date.now()}-3`, name: 'Entity 3'}
                ]
            );
        }, 1000);
    });

    // TODO: uncomment when backend is ready
    /*const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // options can be passed in as query params, numRows=10&sort=name
    return fetch(`${config.apiUrl}/${entityInfo.apiType}/?${options}`, requestOptions)
        .then(handleResponse)
        .catch(handleError);*/
}

const create = (payload) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                {...payload, id: `${Date.now()}`}
            );
        }, 1000);
    });

    // TODO: uncomment when backend is ready
    /*const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: payload instanceof FormData ? payload : JSON.stringify(payload)
    };

    return fetch(`${config.apiUrl}/${entityInfo.apiEntityType}`, requestOptions)
        .then(handleResponse)
        .catch(handleError);*/
}

const update = (id, payload) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                payload
            );
        }, 1000);
    });

    // TODO: uncomment when backend is ready
    /*const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: payload instanceof FormData ? payload : JSON.stringify(payload)
    };

    return fetch(`${config.apiUrl}/${entityInfo.apiEntityType}/${id}`, requestOptions)
        .then(handleResponse)
        .catch(handleError);*/
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                true
            );
        }, 1000);
    });

    // TODO: uncomment when backend is ready
    /*const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/${entityInfo.apiEntityType}/${id}`, requestOptions)
        .then(handleResponse)
        .catch(handleError);*/
}

export const service = {
    getById,
    getAll,
    create,
    update,
    remove
};
