import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Edit from './Edit';
import '@testing-library/jest-dom/extend-expect';
import Swal from 'sweetalert2';

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
    doc: jest.fn(),
    updateDoc: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    uploadBytesResumable: jest.fn(() => ({
        ref: { fullPath: 'test/path' },
    })),
    getDownloadURL: jest.fn().mockResolvedValue('test-url'),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

describe('Edit Component', () => {
    const selectedPet = { id: '1', petName: 'Fluffy', petType: 'Dog', petBreed: 'Poodle', imageUrl: 'test-url' };
    const setPets = jest.fn();
    const setIsEditing = jest.fn();

    test('renders edit pet form', () => {
        render(<Edit pets={[selectedPet]} selectedPet={selectedPet} setPets={setPets} setIsEditing={setIsEditing} />);
        expect(screen.getByText('Edit pet')).toBeInTheDocument();
        expect(screen.getByLabelText(/Pet Name/i)).toHaveValue(selectedPet.petName);
        expect(screen.getByLabelText(/Pet Type/i)).toHaveValue(selectedPet.petType);
        expect(screen.getByLabelText(/Pet Breed/i)).toHaveValue(selectedPet.petBreed);
    });

    test('shows error when required fields are missing', () => {
        render(<Edit pets={[selectedPet]} selectedPet={selectedPet} setPets={setPets} setIsEditing={setIsEditing} />);
        fireEvent.change(screen.getByLabelText(/Pet Name/i), { target: { value: '' } });
        fireEvent.click(screen.getByRole('button', { name: /Update/i }));

        expect(Swal.fire).toHaveBeenCalledWith({
            icon: 'error',
            title: 'Error!',
            text: 'All fields are required.',
            showConfirmButton: true,
        });
    });
});
