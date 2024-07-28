import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { db, auth } from '../../firebase';


import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";




const PetDashboard = ({ setIsAuthenticated }) => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getPets = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const querySnapshot = await getDocs(collection(db, "users", uid, "pets"));
      const petsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPets(petsData);
    } else {
      // Handle case where there is no user logged in
      console.log("No user logged in");
      setPets([]); // Clear pets if no user is logged in
    }
  };

  useEffect(() => {
    getPets()
  }, []);

  const handleEdit = id => {
    const [pet] = pets.filter(pet => pet.id === id);
    setSelectedPet(pet);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const user = auth.currentUser;
        if (!user) {
          return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'You must be logged in to delete a pet.',
            showConfirmButton: true,
          });
        }
        const uid = user.uid;
        deleteDoc(doc(db, "users", uid, "pets", id))
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Pet has been deleted.',
              showConfirmButton: false,
              timer: 1500,
            });
            const updatedPets = pets.filter(pet => pet.id !== id);
            setPets(updatedPets);
          })
          .catch(error => {
            console.error("Error deleting pet:", error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to delete',
              text: 'Something went wrong.',
              showConfirmButton: true,
            });
          });
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            pets={pets}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          pets={pets}
          setPets={setPets}
          setIsAdding={setIsAdding}
          getPets={getPets}
        />
      )}
      {isEditing && (
        <Edit
          pets={pets}
          selectedPet={selectedPet}
          setPets={setPets}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default PetDashboard;