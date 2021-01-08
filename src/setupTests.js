// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import Amplify, { Auth } from 'aws-amplify'
import awsExports from './aws-exports'

// AWS-Amplify
Amplify.configure(awsExports);

// Mock window.scrollTo (browser function)
window.scrollTo = jest.fn();

jest.spyOn(Auth, 'currentAuthenticatedUser')
jest.mock('./backend/api.js')
// Mock AWS sign out button. It caused some problems with tests
jest.mock('@aws-amplify/ui-react', () => {
    return {
        ...jest.requireActual('@aws-amplify/ui-react'),
        AmplifySignOut: 'button'
    }
})
