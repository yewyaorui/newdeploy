import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';
import { UserContext } from '../../contexts/UserContext';
import { Avatar } from '@mui/material';

jest.mock('@mui/material', () => ({
    Avatar: ({ src, alt, children }) => (
        <div>
            {src ? <img src={src} alt={alt} /> : <div>{children}</div>}
        </div>
    ),
}));

describe('Navbar Component', () => {
    test('renders logo when no user is logged in', () => {
        render(
            <UserContext.Provider value={{ currentUser: null }}>
                <Navbar />
            </UserContext.Provider>
        );
        expect(screen.getByText('PawPets')).toBeInTheDocument();
    });

    test('renders user details when a user is logged in with a photoURL', () => {
        const mockUser = {
            displayName: 'Test User',
            photoURL: 'test-photo-url.jpg',
        };
        render(
            <UserContext.Provider value={{ currentUser: mockUser }}>
                <Navbar />
            </UserContext.Provider>
        );
        expect(screen.getByAltText('Test User')).toHaveAttribute('src', 'test-photo-url.jpg');
        expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    test('renders user details with initial if no photoURL', () => {
        const mockUser = {
            displayName: 'Test User',
            photoURL: null,
        };
        render(
            <UserContext.Provider value={{ currentUser: mockUser }}>
                <Navbar />
            </UserContext.Provider>
        );
        expect(screen.getByText('T')).toBeInTheDocument();
        expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    test('renders default initial if displayName is missing', () => {
        const mockUser = {
            displayName: null,
            photoURL: null,
        };
        render(
            <UserContext.Provider value={{ currentUser: mockUser }}>
                <Navbar />
            </UserContext.Provider>
        );
        expect(screen.getByText('A')).toBeInTheDocument();
    });
});
