import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import MessageList from '../components/MessageList'

configure({ adapter: new Adapter() });

describe('Testing MessageList', () => {
    test('rendering MessageList', () => {
        const tree = renderer.create(<MessageList />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})