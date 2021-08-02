import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import MessageGrid from '../components/MessageGrid'
import { messageTypes } from '../consts'

configure({ adapter: new Adapter() });

const messagesError = [{priority: 1, message: "error message"}];
const setMessagesError = jest.fn();
const messagesWarning = [{priority: 2, message: "warning message"}];
const setMessagesWarning = jest.fn();
const messagesInfo = [{priority: 3, message: "info message"}];
const setMessagesInfo = jest.fn();

describe('Testing MessageGrid component', () => {
    test('renders grid for priority 1 (error)', () => {
        const tree = renderer.create(
            <MessageGrid messages={messagesError} setMessages={setMessagesError} type={messageTypes.error} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('renders grid for priority 2 (warning)', () => {
        const tree = renderer.create(
            <MessageGrid messages={messagesWarning} setMessages={setMessagesWarning} type={messageTypes.warning} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('renders grid for priority 3 (info)', () => {
        const tree = renderer.create(
            <MessageGrid messages={messagesInfo} setMessages={setMessagesInfo} type={messageTypes.info} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("new error message", () => {
        const wrapper = shallow(<MessageGrid messages={messagesError} setMessages={setMessagesError} type={messageTypes.error} />);
        const newMessages = [{priority: 1, message: "error message"}, {priority: 1, message: "newest error message"}];
        wrapper.setProps({messages: newMessages});
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    })

    test("new warning message", () => {
        const wrapper = shallow(<MessageGrid messages={messagesWarning} setMessages={setMessagesWarning} type={messageTypes.warning} />);
        const newMessages = [{priority: 2, message: "warning message"}, {priority: 2, message: "newest warning message"}];
        wrapper.setProps({messages: newMessages});
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    })

    test("new info message", () => {
        const wrapper = shallow(<MessageGrid messages={messagesInfo} setMessages={setMessagesInfo} type={messageTypes.info} />);
        const newMessages = [{priority: 2, message: "info message"}, {priority: 2, message: "newest info message"}];
        wrapper.setProps({messages: newMessages});
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    })
})