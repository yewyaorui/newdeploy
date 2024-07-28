import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from './Message';
import '@testing-library/jest-dom/extend-expect';
import { UserContext } from '../../contexts/UserContext';
import { ChatContext } from '../../contexts/ChatContext';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

const mockUser = { currentUser: { uid: '123', displayName: 'Test User', photoURL: 'test-user-photo.jpg' } };
const mockChat = { data: { chatId: '456', user: { uid: '789', photoURL: 'chat-user-photo.jpg' } } };

describe('Message Component', () => {
    test('renders message', () => {
        const message = {
            id: '1',
            text: 'Hiiiiiii!',
            senderId: '123',
            timestamp: '2021-05-18T00:00:00Z',
        };

        render(
            <UserContext.Provider value={mockUser}>
                <ChatContext.Provider value={mockChat}>
                    <Message message={message} />
                </ChatContext.Provider>
            </UserContext.Provider>
        );

        expect(screen.getByText('Hiiiiiii!')).toBeInTheDocument();
        expect(screen.getByAltText('')).toHaveAttribute('src', 'test-user-photo.jpg');
    });
});
