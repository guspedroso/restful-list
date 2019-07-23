import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';

class Entity extends Component {
    componentDidMount() {
        const { getAll } = this.props;
        getAll();
    }

    render() {
        const { entities } = this.props;
        const { result } = entities;

        return (
            <Fragment>
                { !!result && result.map(item =>
                    <div key={item.id}>
                        {item.name}
                    </div>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { entities } = state;
    return {
        entities
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAll: () => dispatch(actions.getAll()),
        create: (payload) => dispatch(actions.create(payload)),
        update: (id, payload) => dispatch(actions.update(id, payload)),
        remove: (id) => dispatch(actions.remove(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
