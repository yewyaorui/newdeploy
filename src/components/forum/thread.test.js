import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Thread from './thread';
import { UserContext } from '../../contexts/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(() => ({})),
    doc: jest.fn(),
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
    arrayUnion: jest.fn(),
    Timestamp: { now: jest.fn(() => new Date()) }
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: 'test-thread-id' }),
    useNavigate: () => jest.fn(),
}));

const mockThreadData = {
    id: 'test-thread-id',
    title: 'Test Thread',
    author: 'Test User',
    date: 1722186588428,
    content: 'This is a test thread content.',
    comments: [
        { author: 'Jasmine', date: 123456, content: 'First comment' },
        { author: 'Gerwayne', date: 654321, content: 'Second comment' }
    ]
};

describe('Thread Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        getDoc.mockResolvedValue({ exists: () => true, data: () => mockThreadData });
    });

    test('renders the thread data', async () => {
        await act(async () => {
            render(
                <UserContext.Provider value={{ currentUser: { displayName: 'Current User' } }}>
                    <Router>
                        <Thread />
                    </Router>
                </UserContext.Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /Test Thread/i })).toBeInTheDocument();
            expect(screen.getByText(/Test User/i)).toBeInTheDocument();
            expect(screen.getByText(/This is a test thread content./i)).toBeInTheDocument();
        });

        mockThreadData.comments.forEach(comment => {
            expect(screen.getByText(comment.content)).toBeInTheDocument();
        });
    });

    test('handles adding a comment', async () => {
        await act(async () => {
            render(
                <UserContext.Provider value={{ currentUser: { displayName: 'Current User' } }}>
                    <Router>
                        <Thread />
                    </Router>
                </UserContext.Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByText(/Add comment/i)).toBeInTheDocument();
        });

        const commentInput = screen.getByPlaceholderText('Add a comment...');
        fireEvent.change(commentInput, { target: { value: 'New comment' } });

        fireEvent.click(screen.getByText(/Add comment/i));

        await waitFor(() => {
            expect(updateDoc).toHaveBeenCalled();
            expect(screen.getByText(/New comment/i)).toBeInTheDocument();
        });
    });

    test('displays error message if thread is not found', async () => {
        getDoc.mockResolvedValue({ exists: () => false });

        await act(async () => {
            render(
                <UserContext.Provider value={{ currentUser: { displayName: 'Current User' } }}>
                    <Router>
                        <Thread />
                    </Router>
                </UserContext.Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByText(/Thread not found or there was an error loading the thread./i)).toBeInTheDocument();
        });
    });
});
