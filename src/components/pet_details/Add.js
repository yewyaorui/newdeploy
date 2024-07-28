import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { auth, db, storage } from '../../firebase';

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const Add = ({ pets, setPets, setIsAdding, getPets }) => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [file, setFile] = useState(null);

  // const [uploadProgress, setUploadProgress] = useState(0);



  const handleAdd = async (e) => {
    e.preventDefault();


    const user = auth.currentUser;
    if (!user) {
      return Swal.fire({
        icon: 'error',
        title: 'Not logged in',
        text: 'You must be logged in to add a pet.',
        showConfirmButton: true,
      });
    }
    const uid = user.uid;

    // check if all components of the form are filled in
    if (!petName || !petType || !petBreed || !file) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const storageRef = ref(storage, `pets/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);
    const imageUrl = await getDownloadURL(uploadTask.ref);


    // construct new pet object and store in pets array
    const newPet = {
      petName,
      petType,
      petBreed,
      imageUrl
    };

    pets.push(newPet);


    // Add a new document with a generated id
    const docRef = await addDoc(collection(db, "users", uid, "pets"), {
      ...newPet
    });


    setPets(pets);
    setIsAdding(false);
    getPets()

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${petName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Pet</h1>
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

        <label htmlFor="file">Pet Image</label>
        <input
          id="file"
          type="file"
          onChange={e => setFile(e.target.files[0])}
        />

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;