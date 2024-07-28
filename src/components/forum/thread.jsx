import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import './styles.css';  // Ensure this imports your CSS

const Thread = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [thread, setThread] = useState(null);
    const [comment, setComment] = useState('');
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const fetchThread = async () => {
            console.log('Fetching thread with ID:', id); // Debugging
            try {
                const threadDoc = await getDoc(doc(db, 'threads', id));
                if (threadDoc.exists()) {
                    console.log('Thread data:', threadDoc.data()); // Debugging
                    setThread({ id: threadDoc.id, ...threadDoc.data() });
                } else {
                    console.log('No such document!');
                    setThread(null);
                }
            } catch (error) {
                console.error('Error fetching thread:', error);
                setThread(null);
            }
        };

        fetchThread();
    }, [id]);

    const handleAddComment = async () => {
        if (!comment.trim()) return;

        const newComment = {
            author: currentUser.displayName,
            date: Timestamp.now(),
            content: comment,
        };

        try {
            await updateDoc(doc(db, 'threads', id), {
                comments: arrayUnion(newComment)
            });

            setThread(prevThread => ({
                ...prevThread,
                comments: [...prevThread.comments, newComment],
            }));

            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (!thread) return <div>Thread not found or there was an error loading the thread.</div>;

    return (
        <div>
            <div className="top-bar">
                <h1>My Pet Forum</h1>
            </div>
            <div className="main">
                <button onClick={() => navigate('/forum')} className="back-button">Back to Forum</button>
                <div className="header">
                    <h4 className="title">{thread.title}</h4>
                    <div className="bottom">
                        <p className="author">by {thread.author}</p>
                        <p className="comment-count">{thread.comments.length} comments</p>
                        <p className="timestamp">
                            {new Date(thread.date).toLocaleString()} {/* Convert milliseconds to Date */}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <p>{thread.content}</p>
                </div>
                <textarea
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Add comment</button>
                <div className="comments">
                    {thread.comments.map((comment, index) => (
                        <div className="comment" key={index}>
                            <div className="top-comment">
                                <p className="user">{comment.author}</p>
                                <p className="comment-ts">
                                    {new Date(comment.date * 1000).toLocaleString()} {/* Adjust as needed */}
                                </p>
                            </div>
                            <div className="comment-content">{comment.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Thread;
