import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import List from '../../components/List/List';
import EntityWrapper from './EntityWrapper';
import EntityDisplay from './EntityDisplay';
import { entityInfo } from './constants';

class Entity extends Component {
    componentDidMount() {
        const { getAll } = this.props;

        getAll();
    }

    render() {
        const { entities, create, update, remove } = this.props;

        return (
            <EntityWrapper>
                <List
                    entityInfo={entityInfo}
                    entities={entities}
                    createAction={create}
                    updateAction={update}
                    removeAction={remove}
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
        list: !!list ? list.filter(item => item.name.toLowerCase().includes(!!filterValue ? filterValue : '')) : []
    }

    return {
        entities
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAll: (options) => dispatch(actions.getAll(options)),
        create: (payload) => dispatch(actions.create(payload)),
        update: (id, payload) => dispatch(actions.update(id, payload)),
        remove: (id) => dispatch(actions.remove(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
