// Reminder.test.js
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Reminder from './reminder';

describe('Reminder Component', () => {
    beforeAll(() => {
        global.Notification = {
            requestPermission: jest.fn(),
        };
        jest.spyOn(global, 'alert').mockImplementation(() => { });
    });

    beforeEach(() => {
        global.Notification.requestPermission.mockResolvedValue('granted');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the Reminder component', () => {
        render(<Reminder />);
        expect(screen.getByText('Reminders!')).toBeInTheDocument();
    });

    test('handles notification permission denied', async () => {
        global.Notification.requestPermission.mockResolvedValue('denied');

        render(<Reminder />);

        await act(async () => {
            fireEvent.click(screen.getByText('Schedule Reminder'));
        });

        expect(global.Notification.requestPermission).toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith('Please allow notification access!');
    });
});
