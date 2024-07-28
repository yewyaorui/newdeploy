import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Signup from './Signup';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
}));

describe('Signup Component', () => {
    test('renders signup form', () => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    });

    test('allows users to type in email and password', () => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
        expect(screen.getByPlaceholderText(/email/i)).toHaveValue('test@example.com');
        expect(screen.getByPlaceholderText(/password/i)).toHaveValue('password123');
    });

    test('shows error message on failed signup', async () => {
        const { createUserWithEmailAndPassword } = require('firebase/auth');
        createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Signup failed'));

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        expect(await screen.findByText(/signup failed/i)).toBeInTheDocument();
    });

    test('redirects on successful signup', async () => {
        const { createUserWithEmailAndPassword } = require('firebase/auth');
        createUserWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '12345' } });

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    });
});
