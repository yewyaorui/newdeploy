import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';
import { Avatar } from '@mui/material';


const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
    // If no user is logged in, show only the logo
    return (
      <div className='navbar'>
        <span className="logo">PawPets</span>
      </div>
    );
  }

  return (
    <div className='navbar'>
      <div className="user">
        {currentUser?.photoURL ? (
          <Avatar src={currentUser.photoURL} alt={currentUser.displayName} />
          ) : (
          <Avatar>{currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'A'}</Avatar>
           )}
          <span style={{ color: 'white', fontSize: '2em' }}>{currentUser?.displayName}</span>
      </div>
    </div>
  );
}


export default Navbar



//const user = useSelector(state => state.data.user.user);