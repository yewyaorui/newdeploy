import React, { useState } from 'react';
import './Signup.css';
import { auth, db, storage } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Add from '../authentication/addImageIcon.png';

const Signup = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(""); // Store error message
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `avatars/${res.user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
        },
        (error) => {
          setErr("Failed to upload avatar. Please try again.");
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          } catch (err) {
            setErr("Failed to update profile. Please try again.");
          }
        }
      );
    } catch (err) {
      setErr("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <span className='logo'>PawPets</span>
      <span className='titlea'>Sign Up</span>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          style={{ display: 'none' }}
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Add} alt="" />
          <span>Add an avatar</span>
        </label>
        <button type="submit">Sign Up</button>
        {err && <span className="error">{err}</span>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Signup;
