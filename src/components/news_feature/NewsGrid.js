import NewsItem from './NewsItem'
import './NewsGrid.css'
import React from 'react';



function NewsGrid({ items }) {

    if (!items || items.length === 0) {
        return <p>No news articles found.</p>;
    }
    return (
        <div className="news-grid">
            {items.map((item, index) => (
                <NewsItem key={index} item={item} />
            ))}
        </div>
    );
}

export default NewsGrid