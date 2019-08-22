import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import { Item } from '../../components';
import { EntityWrapper, EntityDisplay } from '../Entity';
import { entityInfo } from './constants';

class Entity extends Component {
    componentDidMount() {
        const { getByIdAction, id } = this.props;

        if (id) {
            getByIdAction(id);
        }
    }

    render() {
        const { item, updateAction, removeAction } = this.props;

        return (
            <EntityWrapper>
                <Item
                    entityInfo={entityInfo}
                    item={item}
                    updateAction={updateAction}
                    removeAction={removeAction}
                    displayComponent={
                        <EntityDisplay />
                    }
                />
            </EntityWrapper>
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
        getByIdAction: (id) => dispatch(actions.getById(id)),
        updateAction: (id, payload) => dispatch(actions.update(id, payload)),
        removeAction: (id) => dispatch(actions.remove(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
