import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Message from '../components/Message'
import { messageTypes } from '../consts'

configure({ adapter: new Adapter() });

const messageError = {priority: 1, message: "error message"};
const messageWarning = {priority: 2, message: "warning message"};
const messageInfo = {priority: 3, message: "info message"};
const removeMessage = jest.fn();

describe('Testing Message component', () => {
    test('renders message for priority 1 (error)', () => {
        const tree = renderer.create(
            <Message 
              key={messageError.priority}
              datakey={messageError.priority}
              message={messageError.message}
              type={messageTypes.error}
              removeMessage={removeMessage}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('renders message for priority 2 (warning)', () => {
        const tree = renderer.create(
            <Message 
              key={messageWarning.priority}
              datakey={messageWarning.priority}
              message={messageWarning.message}
              type={messageTypes.warning}
              removeMessage={removeMessage}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('renders message for priority 3 (info)', () => {
        const tree = renderer.create(
            <Message 
              key={messageInfo.priority}
              datakey={messageInfo.priority}
              message={messageInfo.message}
              type={messageTypes.info}
              removeMessage={removeMessage}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})