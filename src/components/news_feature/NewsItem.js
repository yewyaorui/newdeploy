import './NewsItem.css'
function NewsItem({ item }) {
    if (!item) {
        return <div>No news item available</div>;
    }

    const websiteUrl = item.url || '';
    const website = websiteUrl.split('https://').pop().split('/')[0];
    const date = item.publishedAt || 'Unknown date';
    const description = item.description || 'No description available';

    return (
        <a href={websiteUrl} className="article">
            <div className="article-image">
                <img src={item.imageUrl || 'default_image_url'} alt={item.title || 'No title'} />
            </div>
            <div className="article-content">
                <div className="article-source">
                    <img
                        src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE%2CSIZE%2CURL&url=http://${website}&size=16`}
                        alt={item.source?.id || 'source-id'}
                    />
                    <span>{item.source?.name || 'Unknown source'}</span>
                </div>
                <div className="article-title">
                    <h2>{item.title || 'No title'}</h2>
                </div>
                <p className="article-description">
                    {description}
                </p>
                <div className="article-details">
                    <small><b>Published At:</b> {new Date(date).toLocaleString()}</small>
                </div>
            </div>
        </a>
    );
}


export default NewsItem