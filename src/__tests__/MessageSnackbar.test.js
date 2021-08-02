import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import MessageSnackbar from '../components/MessageSnackbar'

configure({ adapter: new Adapter() });

const snackbarOpen = {open: true, message: "snackbar message"}
const snackbarClosed = {open: false, message: ""}
const handleCloseSnackbar = jest.fn()

describe('Testing MessageSnackbar', () => {
    test('rendering Snackbar open', () => {
        const tree = renderer.create(<MessageSnackbar snackbar={snackbarOpen} handleCloseSnackbar={handleCloseSnackbar} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('rendering Snackbar closed', () => {
        const tree = renderer.create(<MessageSnackbar snackbar={snackbarClosed} handleCloseSnackbar={handleCloseSnackbar} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})