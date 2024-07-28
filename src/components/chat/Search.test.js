import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search';
import { UserContext } from '../../contexts/UserContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

jest.mock('../../firebase', () => ({
    db: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    doc: jest.fn(),
    serverTimestamp: jest.fn(),
}));

describe('Search Component', () => {
    const mockCurrentUser = { uid: '123', displayName: 'Current User', photoURL: 'current-user-photo.jpg' };
    const mockUser = { uid: '456', displayName: 'Found User', photoURL: 'found-user-photo.jpg' };
    const mockDocSnapshot = { exists: jest.fn(() => false) };

    beforeEach(() => {
        getDocs.mockResolvedValue({ empty: false, forEach: (callback) => callback({ data: () => mockUser }) });
        getDoc.mockResolvedValue(mockDocSnapshot);
        setDoc.mockClear();
        updateDoc.mockClear();
    });

    test('renders input field', () => {
        render(
            <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
                <Search />
            </UserContext.Provider>
        );
        expect(screen.getByPlaceholderText('Find a user')).toBeInTheDocument();
    });

    test('shows error message when user not found', async () => {
        getDocs.mockResolvedValueOnce({ empty: true });
        render(
            <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
                <Search />
            </UserContext.Provider>
        );
        fireEvent.change(screen.getByPlaceholderText('Find a user'), { target: { value: 'NonExistentUser' } });
        await act(async () => {
            fireEvent.keyDown(screen.getByPlaceholderText('Find a user'), { key: 'Enter', code: 'Enter' });
        });
        expect(await screen.findByText('User not found!')).toBeInTheDocument();
    });

    test('displays user information when user found', async () => {
        render(
            <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
                <Search />
            </UserContext.Provider>
        );
        fireEvent.change(screen.getByPlaceholderText('Find a user'), { target: { value: 'Found User' } });
        await act(async () => {
            fireEvent.keyDown(screen.getByPlaceholderText('Find a user'), { key: 'Enter', code: 'Enter' });
        });
        expect(await screen.findByText('Found User')).toBeInTheDocument();
    });


});
