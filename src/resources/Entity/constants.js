export const entityInfo = {
    apiType: 'entity',
    title: 'Entity',
    listTitle: 'Entities',
    inputTypes: [
        {
            label: 'Name',
            type: 'text',
            placeholder: 'Enter name',
            name: 'name',
            required: true,
            showInDisplayView: true
        },
    ]
};

const constantsType = entityInfo.apiType.toUpperCase();

export const constants = {
    GETBYID_REQUEST: `${constantsType}_GETBYID_REQUEST`,
    GETBYID_SUCCESS: `${constantsType}_GETBYID_SUCCESS`,
    GETBYID_FAILURE: `${constantsType}_GETBYID_FAILURE`,

    GETALL_REQUEST: `${constantsType}_GETALL_REQUEST`,
    GETALL_SUCCESS: `${constantsType}_GETALL_SUCCESS`,
    GETALL_FAILURE: `${constantsType}_GETALL_FAILURE`,

    CREATE_REQUEST: `${constantsType}_CREATE_REQUEST`,
    CREATE_SUCCESS: `${constantsType}_CREATE_SUCCESS`,
    CREATE_FAILURE: `${constantsType}_CREATE_FAILURE`,

    UPDATE_REQUEST: `${constantsType}_UPDATE_REQUEST`,
    UPDATE_SUCCESS: `${constantsType}_UPDATE_SUCCESS`,
    UPDATE_FAILURE: `${constantsType}_UPDATE_FAILURE`,

    REMOVE_REQUEST: `${constantsType}_REMOVE_REQUEST`,
    REMOVE_SUCCESS: `${constantsType}_REMOVE_SUCCESS`,
    REMOVE_FAILURE: `${constantsType}_REMOVE_FAILURE`,
};
