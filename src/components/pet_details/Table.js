import React from 'react';
import './Table.css';


const Table = ({ pets, handleEdit, handleDelete }) => {
  return (
    <div className="container">
      {pets && pets.map((pet) => (
        <div key={pet.id} className="card">
          <img src={pet.imageUrl} alt={pet.petName} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <div className="card-content">
            {/* <p><strong>Id:</strong> {pet.id}</p> */}
            <p><strong>Pet Name:</strong> {pet.petName}</p>
            <p><strong>Pet Type:</strong> {pet.petType}</p>
            <p><strong>Pet Breed:</strong> {pet.petBreed}</p>
          </div>
          <div className="card-actions">
            <button onClick={() => handleEdit(pet.id)} className="button muted-button">Edit</button>
            <button onClick={() => handleDelete(pet.id)} className="button muted-button">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;