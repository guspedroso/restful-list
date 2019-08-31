import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from './actions';
import { Item } from '../../components';
import { EntityWrapper, EntityDisplay } from '../Entity';
import { entityInfo } from './constants';
import { entityInfoPropType } from '../../common/propTypes';

class EntityItem extends Component {
    componentDidMount() {
        const { getByIdAction, id } = this.props;

        if (id && !!getByIdAction) {
            getByIdAction(id);
        }
    }

    render() {
        return (
            <EntityWrapper>
                <Item
                    {...this.props}
                    displayComponent={
                        <EntityDisplay />
                    }
                />
            </EntityWrapper>
        );
    }
}

EntityItem.propTypes = {
    entityInfo: entityInfoPropType,
    item: PropTypes.object.isRequired,
    id: PropTypes.string,
    getByIdAction: PropTypes.func,
    updateAction: PropTypes.func,
    removeAction: PropTypes.func,
};

EntityItem.defaultProps = {
    item: {}
};

const mapStateToProps = (state, ownProps) => {
    const { entities } = state;
    const { item } = entities;

    return {
        item,
        entityInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getByIdAction: (id) => dispatch(actions.getById(id)),
        updateAction: (id, payload) => dispatch(actions.update(id, payload)),
        removeAction: (id) => dispatch(actions.remove(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityItem);
