import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { ProviderWrapper } from '../../getProvider';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ProviderWrapper>
            <Filter setAction={() => {}} />
        </ProviderWrapper>, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('Snapshot works', () => {
    let component = renderer.create(
        <ProviderWrapper>
            <Filter setAction={() => {}} />
        </ProviderWrapper>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
