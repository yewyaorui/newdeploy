// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { TextDecoder, TextEncoder } from 'util';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();


global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

// Mock environment variables
process.env.REACT_APP_API_KEY = 'mock_api_key';
process.env.REACT_APP_AUTH_DOMAIN = 'mock_auth_domain';
process.env.REACT_APP_PROJECT_ID = 'mock_project_id';
process.env.REACT_APP_STORAGE_BUCKET = 'mock_storage_bucket';
process.env.REACT_APP_MESSAGING_SENDER_ID = 'mock_messaging_sender_id';
process.env.REACT_APP_APP_ID = 'mock_app_id';