// build more buttons inside here like blablabla maps bla

import React, { useState, useContext } from 'react';
import './Sidenav.css';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { logoutUser } from '../features/userSlice';
import { signOut } from 'firebase/auth';
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export const Sidenav = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
        signOut(auth);
    };
    const [menuOpen, setMenuOpen] = useState(false);
    const { currentUser } = useContext(UserContext);

    return (
        <nav className="sidenav__nav">
            <Link to="/" className="title">PawPets</Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? 'open' : ''}>
                <li>
                    <NavLink to="/chat">Chat</NavLink>
                </li>
                <li>
                    <NavLink to="/forum">Forum</NavLink>
                </li>
                <li>
                    <NavLink to="/map">Map Feature</NavLink>
                </li>
                <li>
                    <NavLink to="/news">News</NavLink>
                </li>
                <li>
                    <NavLink to="/reminders">Reminders</NavLink>
                </li>
            </ul>

            <div className="sidenav__header">
                {currentUser?.photoURL ? (
                    <Avatar src={currentUser.photoURL} alt={currentUser.displayName} />
                    ) : (
                    <Avatar>{currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'A'}</Avatar>
                )}
                <span style={{ color: 'white', fontWeight: 'bold' }}>{currentUser?.displayName}</span>
            </div>

            <button onClick={handleLogout} className="logout__button">
                Log out
            </button>
        </nav>
    );
};

export default Sidenav;
