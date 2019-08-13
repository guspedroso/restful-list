import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import List from '../../components/List/List';
import EntityWrapper from './EntityWrapper';
import EntityDisplay from './EntityDisplay';
import { entityInfo } from './constants';

class Entity extends Component {
    componentDidMount() {
        const { getAllAction } = this.props;

        getAllAction();
    }

    render() {

        return (
            <EntityWrapper>
                <List
                    {...this.props}
                    entityInfo={entityInfo}
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

const mapStateToProps = (state, ownProps) => {
    let { entities, filter } = state;
    let { filterValue } = filter;
    let { list } = entities;

    entities = {
        ...entities,
        list: !!list ? list.filter(item => !!item.name && item.name.toLowerCase().includes(!!filterValue ? filterValue : '')) : []
    }

    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
