import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Add from './Add';
import '@testing-library/jest-dom/extend-expect';

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
        currentUser: { uid: 'test-uid' },
    })),
}));
jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    addDoc: jest.fn(),
}));
jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    uploadBytesResumable: jest.fn(() => ({
        ref: { fullPath: 'test/path' },
    })),
    getDownloadURL: jest.fn().mockResolvedValue('test-url'),
}));


describe('Add Component', () => {
    test('renders add pet form', () => {
        render(<Add pets={[]} setPets={jest.fn()} setIsAdding={jest.fn()} getPets={jest.fn()} />);
        expect(screen.getByText('Add Pet')).toBeInTheDocument();
    });

    test('handles form submission', async () => {
        render(<Add pets={[]} setPets={jest.fn()} setIsAdding={jest.fn()} getPets={jest.fn()} />);
        fireEvent.change(screen.getByLabelText(/Pet Name/i), { target: { value: 'Fluffy' } });
        fireEvent.change(screen.getByLabelText(/Pet Type/i), { target: { value: 'Dog' } });
        fireEvent.change(screen.getByLabelText(/Pet Breed/i), { target: { value: 'Poodle' } });
        fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    });
});
