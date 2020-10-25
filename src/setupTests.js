// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

// AWS-Amplify
import Amplify from 'aws-amplify'
import awsExports from './aws-exports'
Amplify.configure(awsExports);

// Mock window.scrollTo (browser function)
window.scrollTo = jest.fn();