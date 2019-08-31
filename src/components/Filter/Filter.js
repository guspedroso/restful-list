import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { actions } from './actions';

const Filter = (props) => {
    const { filterValue = '', placeholder = 'Filter...', setAction } = props;

    const handleChange = event => setAction(event.target.value);

    return (
        <Form.Group>
            <Form.Control 
                type='text'
                placeholder={placeholder}
                name={filterValue}
                onChange={handleChange}
            />
        </Form.Group>
    );
}

const mapStateToProps = (state, ownProps) => {
    const { filter } = state;
    const { filterValue } = filter;

    return {
        filterValue
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAction: (filterValue) => dispatch(actions.set(filterValue))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);