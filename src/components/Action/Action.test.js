import React from 'react';
import ReactDOM from 'react-dom';
import Action from './Action';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Action />, div);
    ReactDOM.unmountComponentAtNode(div);
});

/*it('toggling the remove button works', () => {
    const wrapper = shallow(<Action />);
    const instance = wrapper.instance();

    expect(wrapper.state('removeView')).toBe(false);

    instance.toggleRemove();

    expect(wrapper.state('removeView')).toBe(true);
});*/

test('Snapshot works', () => {
    let component = renderer.create(
        <Action/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Disabled snapshots work', () => {
    let component = renderer.create(
        <Action 
            disabled={true}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(
        <Action 
            disabled={false}
        />,
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Open snapshots work', () => {
    let component = renderer.create(
        <Action 
            open={true}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(
        <Action 
            open={false}
        />,
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Hide snapshots work', () => {
    let component = renderer.create(
        <Action 
            hide={true}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(
        <Action 
            hide={false}
        />,
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Action types snapshots work', () => {
    let component = renderer.create(
        <Action 
            actionType={'Test'}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Outer class snapshots work', () => {
    let component = renderer.create(
        <Action 
            outerClass={'test'}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Open with different combinations of functions snapshots work', () => {
    let component = renderer.create(
        <Action 
            open={true}
            createAction={() => console.warn('create')}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(
        <Action 
            open={true}
            updateAction={() => console.warn('update')}
        />,
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(
        <Action 
            open={true}
            removeAction={() => console.warn('remove')}
        />,
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(
        <Action 
            open={true}
            createAction={() => console.warn('create')}
            updateAction={() => console.warn('update')}
        />,
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(
        <Action 
            open={true}
            createAction={() => console.warn('create')}
            removeAction={() => console.warn('remove')}
        />,
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(
        <Action 
            open={true}
            updateAction={() => console.warn('update')}
            removeAction={() => console.warn('remove')}
        />,
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(
        <Action 
            open={true}
            createAction={() => console.warn('create')}
            updateAction={() => console.warn('update')}
            removeAction={() => console.warn('remove')}
        />,
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
