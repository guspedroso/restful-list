import React from 'react';
import ReactDOM from 'react-dom';
import Action from './Action';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Action />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('toggling the remove button works', () => {
    const wrapper = shallow(<Action />);
    expect(wrapper.state('removeView')).toBe(false);
});
