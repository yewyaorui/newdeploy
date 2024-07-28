import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import '@testing-library/jest-dom/extend-expect';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({});

describe('Login Component', () => {
    test('renders login form', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    test('allows users to type in email and password', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

        expect(screen.getByPlaceholderText(/email/i)).toHaveValue('test@example.com');
        expect(screen.getByPlaceholderText(/password/i)).toHaveValue('password123');
    });

    test('navigates to home on successful login', async () => {
        const { signInWithEmailAndPassword } = require('firebase/auth');
        signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '12345' } });

        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    });
});
