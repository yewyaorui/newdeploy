// src/addDefaultThreads.js

import { db } from './firebase';
import { collection, setDoc, doc } from 'firebase/firestore';

const defaultThreads = [
    {
        id: 1,
        title: "What foods must dogs avoid?",
        author: "Aaron",
        date: Date.now(),
        content: "chocolate, what else?",
        comments: [
            {
                author: "Jack",
                date: Date.now(),
                content: "Hey there, you are right about chocolate. some dogs may be allergic to chicken"
            },
            {
                author: "Aaron",
                date: Date.now(),
                content: "thanks jack!"
            }
        ]
    },
    {
        id: 2,
        title: "places to bring ur furries out to",
        author: "Mary",
        date: Date.now(),
        content: "surrey grocers!",
        comments: [
            {
                author: "Jack",
                date: Date.now(),
                content: "Hey there, what pet do you have?"
            },
            {
                author: "Mary",
                date: Date.now(),
                content: "a dog and a cat!"
            }
        ]
    },
];

const addDefaultThreads = async () => {
  try {
    const threadsCollection = collection(db, 'threads');
    for (const thread of defaultThreads) {
      await setDoc(doc(threadsCollection, String(thread.id)), thread);
    }
    console.log("Default threads added successfully");
  } catch (error) {
    console.error("Error adding default threads: ", error);
  }
};

export default addDefaultThreads;
