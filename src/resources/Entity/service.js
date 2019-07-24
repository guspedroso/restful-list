/*import { authHeader, handleResponse, handleError } from '../../common/helper';
import { config } from '../../common/config';
import { entityInfo } from './constants';*/

const getAll = () => {
    return Promise.resolve([
        {id: `${Date.now()}-1`, name: 'Entity 1'},
        {id: `${Date.now()}-2`, name: 'Entity 2'},
        {id: `${Date.now()}-3`, name: 'Entity 3'}
    ])

    // TODO: uncomment when backend is ready
    /*const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // options can be passed in as query params, ?numRows=10&sort=name in future
    return fetch(`${config.apiUrl}/${entityInfo.apiType}`, requestOptions)
        .then(handleResponse)
        .catch(handleError);*/
}

const create = (payload) => {
    return Promise.resolve({...payload, id: `${Date.now()}`})

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
    return Promise.resolve(payload)

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
    return Promise.resolve(true)

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
    getAll,
    create,
    update,
    remove
};
