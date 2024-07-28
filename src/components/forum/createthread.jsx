import React, { useState, useContext } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs, setDoc, doc } from 'firebase/firestore';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Ensure you import the styles

const CreateThread = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleCreateThread = async () => {
        if (!title.trim() || !content.trim()) return;

        try {
            // Fetch the current maximum numeric ID
            const threadsCollection = collection(db, 'threads');
            const q = query(threadsCollection, orderBy("id", "desc"));
            const querySnapshot = await getDocs(q);
            const maxId = querySnapshot.docs.length > 0 ? parseInt(querySnapshot.docs[0].data().id) : 2;

            const newThreadId = maxId + 1;

            const newThread = {
                id: newThreadId,
                title,
                author: currentUser.displayName,
                date: Date.now(),
                content,
                comments: [],
            };

            await setDoc(doc(db, 'threads', String(newThreadId)), newThread);

            setTitle('');
            setContent('');
            navigate('/forum');
        } catch (error) {
            console.error('Error creating thread: ', error);
        }
    };

    return (
        <div className="main">
            <button className="back-button" onClick={() => navigate('/forum')}>Back to Forum</button>
            <h1>Create New Thread</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button onClick={handleCreateThread}>Create Thread</button>
        </div>
    );
};

export default CreateThread;
