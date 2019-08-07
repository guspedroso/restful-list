import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { actions } from './actions';

class Filter extends Component {
    handleChange = (event) => {
        const { value } = event.target;
        const { set } = this.props;

        set(value);
    }

    render() {
        const { filterValue, placeholder } = this.props;

        return (
            <Form.Group>
                <Form.Control 
                    type='text'
                    placeholder={placeholder}
                    name={filterValue}
                    onChange={this.handleChange}
                />
            </Form.Group>
        );
    }
}

Filter.propTypes = {
    filterValue: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
};

Filter.defaultProps = {
    filterValue: '',
    placeholder: 'Filter...'
};

const mapStateToProps = (state, ownProps) => {
    const { filter } = state;
    const { filterValue } = filter;

    return {
        filterValue
    }
};

const mapDispatchToProps = dispatch => {
    return {
        set: (filterValue) => dispatch(actions.set(filterValue))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
