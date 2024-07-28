// NewsItem.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsItem from './NewsItem';

describe('NewsItem Component', () => {
    const item = {
        url: 'https://example.com/news/1',
        title: 'Test News Title',
        description: 'Test News Description',
        publishedAt: '2024-07-30T12:00:00Z',
        source: { name: 'Test Source', id: 'test-source' },
        imageUrl: 'https://example.com/image.jpg'
    };

    test('renders NewsItem component correctly', () => {
        render(<NewsItem item={item} />);

        expect(screen.getByText('Test News Title')).toBeInTheDocument();
        expect(screen.getByText('Test News Description')).toBeInTheDocument();
        expect(screen.getByText(/Published At:/i)).toBeInTheDocument();
    });

    test('renders with missing description', () => {
        const incompleteItem = { ...item, description: undefined };
        render(<NewsItem item={incompleteItem} />);

        expect(screen.getByText('No description available')).toBeInTheDocument();
    });

    test('renders without crashing on undefined item', () => {
        render(<NewsItem item={undefined} />);
        expect(screen.getByText('No news item available')).toBeInTheDocument();
    });
});
