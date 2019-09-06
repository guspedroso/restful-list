import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Filter = (props) => {
    const { filterValue, placeholder, setAction } = props;

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

Filter.propTypes = {
    filterValue: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    setAction: PropTypes.func.isRequired
};

Filter.defaultProps = {
    filterValue: '',
    placeholder: 'Filter...'
};

export default Filter;
