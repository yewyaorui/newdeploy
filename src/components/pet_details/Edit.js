import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Edit = ({ pets, selectedPet, setPets, setIsEditing }) => {
  const id = selectedPet.id;

  const [petName, setPetName] = useState(selectedPet.petName);
  const [petType, setPetType] = useState(selectedPet.petType);
  const [petBreed, setPetBreed] = useState(selectedPet.petBreed);
  const [file, setFile] = useState(null);


  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!petName || !petType || !petBreed) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const user = auth.currentUser;
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You must be logged in to edit a pet.',
        showConfirmButton: true,
      });
      return;
    }
    const uid = user.uid;

    let imageUrl = selectedPet.imageUrl;
    if (file) {
      const storageRef = ref(storage, `pets/${file.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      imageUrl = await getDownloadURL(uploadTask.ref);
    }

    const updatedPet = {
      id,
      petName,
      petType,
      petBreed,
      imageUrl
    };


    try {
      // Update the document in Firestore using the user's UID
      await updateDoc(doc(db, "users", uid, "pets", id), updatedPet);

      // Update the local state
      const updatedPets = pets.map(pet => pet.id === id ? { ...pet, ...updatedPet } : pet);
      setPets(updatedPets);

      setIsEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${petName}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating pet:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        text: 'There was an error updating the pet data.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit pet</h1>
        <label htmlFor="petName">Pet Name</label>
        <input
          id="petName"
          type="text"
          name="petName"
          value={petName}
          onChange={e => setPetName(e.target.value)}
        />
        <label htmlFor="petType">Pet Type</label>
        <input
          id="petType"
          type="text"
          name="petType"
          value={petType}
          onChange={e => setPetType(e.target.value)}
        />
        <label htmlFor="petBreed">Pet Breed</label>
        <input
          id="petBreed"
          type="text"
          name="petBreed"
          value={petBreed}
          onChange={e => setPetBreed(e.target.value)}
        />
        <label htmlFor="file">Change Pet Image</label>
        <input
          id="file"
          type="file"
          onChange={e => setFile(e.target.files[0])}
        />

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;