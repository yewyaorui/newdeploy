import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Createthread from './createthread';
import { UserContext } from '../../contexts/UserContext';

const mockCurrentUser = {
    displayName: 'Test User',
    photoURL: 'test-user-photo.jpg',
};

describe('Createthread Component', () => {
    it('renders the create thread form', () => {
        render(
            <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
                <Router>
                    <Createthread />
                </Router>
            </UserContext.Provider>
        );

        expect(screen.getByText(/Create New Thread/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Content/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create Thread/i })).toBeInTheDocument();
    });

    it('submits the form with title and content', () => {
        render(
            <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
                <Router>
                    <Createthread />
                </Router>
            </UserContext.Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Test Thread' } });
        fireEvent.change(screen.getByPlaceholderText(/Content/i), { target: { value: 'This is a test thread content.' } });
        fireEvent.click(screen.getByRole('button', { name: /Create Thread/i }));
    });
});
