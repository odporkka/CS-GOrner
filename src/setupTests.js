// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import { mockData } from './__mocks__/mockData'

// AWS-Amplify
import Amplify, { Auth } from 'aws-amplify'
import awsExports from './aws-exports'
Amplify.configure(awsExports);

// Mock window.scrollTo (browser function)
window.scrollTo = jest.fn();

jest.mock('aws-amplify')

global.beforeEach(() => {
    Auth.currentAuthenticatedUser = jest.fn(mockData.amplifyAuth.currentAuthenticatedUserReject)
})

global.afterEach(() => {
    Auth.currentAuthenticatedUser.mockClear()
})


