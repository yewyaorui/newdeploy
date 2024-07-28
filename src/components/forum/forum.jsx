import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './styles.css';

const Forum = () => {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'threads'));
                const threadsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setThreads(threadsList);
            } catch (err) {
                console.error('Error fetching threads:', err);
                setError('Failed to load threads.');
            } finally {
                setLoading(false);
            }
        };

        fetchThreads();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="top-bar">
                <h1>My Pet Forum</h1>
            </div>
            <div className="main">
                <Link to="/create-thread" className="create-thread-button">Create New Thread</Link>
                <ol>
                    {threads.map(thread => (
                        <li key={thread.id}>
                            <Link to={`/forum/${thread.id}`}>
                                <h4 className="title">{thread.title}</h4>
                                <div className="bottom">
                                    <p className="timestamp">
                                        {new Date(thread.date).toLocaleString()} {/* Convert milliseconds to Date */}
                                    </p>
                                    <p className="comment-count">{thread.comments.length} comments</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Forum;
