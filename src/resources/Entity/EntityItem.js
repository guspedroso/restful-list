import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import Item from '../../components/Item/Item';
import { entityInfo } from './constants';

class Entity extends Component {
    componentDidMount() {
        const { getById, id } = this.props;

        if (id) {
            getById(id);
        }
    }

    render() {
        const { item, update, remove } = this.props;

        return (
            <Item
                entityInfo={entityInfo}
                item={item}
                updateAction={update}
                removeAction={remove}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { entities } = state;
    const { item } = entities;

    return {
        item
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getById: (id) => dispatch(actions.getById(id)),
        update: (id, payload) => dispatch(actions.update(id, payload)),
        remove: (id) => dispatch(actions.remove(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
