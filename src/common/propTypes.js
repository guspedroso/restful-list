import PropTypes from 'prop-types';

export const entityInfoPropType = PropTypes.shape({
    apiType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listTitle: PropTypes.string.isRequired,
    inputTypes: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            label: PropTypes.string,
            placeholder: PropTypes.string,
            required: PropTypes.bool,
            canShow: PropTypes.bool,
            canEdit: PropTypes.bool
        })
    ).isRequired
}).isRequired;

export const entitiesPropType = PropTypes.shape({
    list: PropTypes.array.isRequired,
    requesting: PropTypes.bool,
    created: PropTypes.bool,
    creating: PropTypes.bool,
    updating: PropTypes.bool,
    removing: PropTypes.bool,
    error: PropTypes.string
}).isRequired;