const getAll = () => {
    return Promise.resolve([
        {id: `${Date.now()}-1`, name: 'Entity 1'},
        {id: `${Date.now()}-2`, name: 'Entity 2'},
        {id: `${Date.now()}-3`, name: 'Entity 3'}
    ])
}

const create = (payload) => {
    return Promise.resolve({...payload, id: `${Date.now()}`})
}

const update = (id, payload) => {
    return Promise.resolve(payload)
}

const remove = (id) => {
    return Promise.resolve(true)
}

export const service = {
    getAll,
    create,
    update,
    remove
};
