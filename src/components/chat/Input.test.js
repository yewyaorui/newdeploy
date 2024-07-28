// Input.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';
import '@testing-library/jest-dom/extend-expect';
import { UserContext } from '../../contexts/UserContext';
import { ChatContext } from '../../contexts/ChatContext';

const mockUser = { currentUser: { uid: '123', displayName: 'Test User' } };
const mockChat = { data: { chatId: '456', user: { name: 'Chat User', uid: '789' } } };

describe('Input Component', () => {
    test('renders input field', () => {
        render(
            <UserContext.Provider value={mockUser}>
                <ChatContext.Provider value={mockChat}>
                    <Input />
                </ChatContext.Provider>
            </UserContext.Provider>
        );

        expect(screen.getByPlaceholderText('Type something...')).toBeInTheDocument();
    });

    test('handles user input', async () => {
        const handleSubmit = jest.fn();
        render(
            <UserContext.Provider value={mockUser}>
                <ChatContext.Provider value={mockChat}>
                    <Input />
                </ChatContext.Provider>
            </UserContext.Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Type something...'), { target: { value: 'Hello' } });
        fireEvent.click(screen.getByRole('button', { name: /Send/i }));

    });
});
