import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
    test('renders header with title and add button', () => {
        const { getByText } = render(<Header setIsAdding={jest.fn()} setIsAuthenticated={jest.fn()} />);
        expect(getByText('My Petfolio')).toBeInTheDocument();
        expect(getByText('Add Your Pets')).toBeInTheDocument();
    });

    test('calls setIsAdding when Add Your Pets button is clicked', () => {
        const setIsAdding = jest.fn();
        const { getByText } = render(<Header setIsAdding={setIsAdding} setIsAuthenticated={jest.fn()} />);
        fireEvent.click(getByText('Add Your Pets'));
        expect(setIsAdding).toHaveBeenCalledWith(true);
    });
});
