import PropTypes from 'prop-types';

// every input type follows this shape
const inputTypePropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    canShow: PropTypes.bool,
    canEdit: PropTypes.bool
});

// array of input types for each entity
const inputTypesPropType = PropTypes.arrayOf(
    inputTypePropType
).isRequired;

// every entity will have this type of info
export const entityInfoPropType = PropTypes.shape({
    apiType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listTitle: PropTypes.string.isRequired,
    inputTypes: inputTypesPropType,
    filterType: PropTypes.string
}).isRequired;

// ever list of entities will be shaped like this
export const entitiesPropType = PropTypes.shape({
    list: PropTypes.array,
    requesting: PropTypes.bool,
    created: PropTypes.bool,
    creating: PropTypes.bool,
    updating: PropTypes.bool,
    removing: PropTypes.bool,
    error: PropTypes.string
}).isRequired;
