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
        const { list, create, update, remove } = this.props;

        return (
            <List
                entityInfo={entityInfo}
                list={list}
                createAction={create}
                updateAction={update}
                removeAction={remove}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { entities } = state;
    const { list } = entities;
    return {
        list
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