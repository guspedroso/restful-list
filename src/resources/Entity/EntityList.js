import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from './actions';
import { List } from '../../components';
import { EntityWrapper, EntityDisplay } from '../Entity';
import { entityInfo } from './constants';
import { entityInfoPropType, entitiesPropType } from '../../common/propTypes';

class EntityList extends Component {
    componentDidMount() {
        const { getAllAction } = this.props;

        getAllAction();
    }

    render() {
        return (
            <EntityWrapper>
                <List
                    {...this.props}
                    displayComponent={
                        <EntityDisplay 
                            listView={true}
                        />
                    }
                />
            </EntityWrapper>
        );
    }
}

EntityList.propTypes = {
    entityInfo: entityInfoPropType,
    entities: entitiesPropType,
    getAllAction: PropTypes.func,
    createAction: PropTypes.func,
    updateAction: PropTypes.func,
    removeAction: PropTypes.func,
    valueAction: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    let { entities, filter } = state;
    let { filterValue } = filter;
    let { list } = entities;

    // filter if needed
    list = !!list ? list.filter(item => !!item.name && item.name.toLowerCase().includes(!!filterValue ? filterValue : '')) : [];

    entities = {
        ...entities,
        list: list
    }

    return {
        entityInfo,
        entities
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllAction: (options) => dispatch(actions.getAll(options)),
        createAction: (payload) => dispatch(actions.create(payload)),
        updateAction: (id, payload) => dispatch(actions.update(id, payload)),
        removeAction: (id) => dispatch(actions.remove(id)),
        valueAction: (name, value) => dispatch(actions.setValue(name, value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityList);
