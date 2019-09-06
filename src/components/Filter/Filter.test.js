import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Filter setAction={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('Snapshot works', () => {
    let component = renderer.create(
        <Filter setAction={() => {}} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
