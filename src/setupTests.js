// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import Amplify, {Auth, Storage} from 'aws-amplify'
import awsExports from './aws-exports'
import * as uuid from 'uuid'

// AWS and Amplify
Amplify.configure(awsExports);
jest.spyOn(Auth, 'currentAuthenticatedUser')
jest.spyOn(Storage, 'put')
jest.spyOn(Storage, 'getPluggable')

// Mock window functions
window.scrollTo = jest.fn();
window.alert = jest.fn();

// External libraries
jest.mock('uuid', () => ({ v4: () => 'd3adb33f-0000-0000-0000-aabbccddeeff' }));

jest.mock('./backend/api.js')
// Mock AWS sign out button. It caused some problems with tests
jest.mock('@aws-amplify/ui-react', () => {
    return {
        ...jest.requireActual('@aws-amplify/ui-react'),
        AmplifySignOut: 'button'
    }
})
