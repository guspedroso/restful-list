import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import List from '../../components/List/List';
import { entityInfo } from './constants';

class Entity extends Component {
    componentDidMount() {
        const { getAll } = this.props;
        getAll();
    }

    render() {
        const { list, requesting, creating, error, create, update, remove } = this.props;

        return (
            <List
                entityInfo={entityInfo}
                list={list}
                requesting={requesting}
                creating={creating}
                error={error}
                createAction={create}
                updateAction={update}
                removeAction={remove}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { entities } = state;
    const { list, requesting, creating, error } = entities;
    return {
        list,
        requesting,
        creating,
        error
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
