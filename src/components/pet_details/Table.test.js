import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Table from './Table';
import '@testing-library/jest-dom/extend-expect';

const pets = [
    { id: '1', petName: 'Woof', petType: 'Dog', petBreed: 'Poodle', imageUrl: 'test-url' },
    { id: '2', petName: 'Momo', petType: 'Cat', petBreed: 'Siamese', imageUrl: 'test-url' },
];

describe('Table Component', () => {
    test('renders pet data', () => {
        render(<Table pets={pets} handleEdit={jest.fn()} handleDelete={jest.fn()} />);
        expect(screen.getByText('Woof')).toBeInTheDocument();
        expect(screen.getByText('Momo')).toBeInTheDocument();
        expect(screen.getByText('Dog')).toBeInTheDocument();
        expect(screen.getByText('Cat')).toBeInTheDocument();
    });

    test('calls handleEdit and handleDelete on button clicks', () => {
        const handleEdit = jest.fn();
        const handleDelete = jest.fn();
        render(<Table pets={pets} handleEdit={handleEdit} handleDelete={handleDelete} />);

        fireEvent.click(screen.getAllByText('Edit')[0]);
        fireEvent.click(screen.getAllByText('Delete')[0]);

        expect(handleEdit).toHaveBeenCalledWith('1');
        expect(handleDelete).toHaveBeenCalledWith('1');
    });
});
