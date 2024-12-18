import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteConfirmation = ({ id, onDelete, onCancel, handleDeletingProduct }) => {
const cancelStatus = false;
const navigate = useNavigate()
 
const onDeletingProduct = (e, id) => {
  e.preventDefault();
  e.stopPropagation();
  handleDeletingProduct(id);
  navigate("/products")
}
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Are you sure you want to delete this product?</h3>
        <p> will be permanently removed.</p>
        <div style={styles.actions}>
          <button style={styles.cancelButton} onClick={() => onCancel(false)}>
            Cancel
          </button>
          <button style={styles.deleteButton} onClick={onDeletingProduct}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '600px',
    textAlign: 'center',
  },
  actions: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  cancelButton: {
    padding: '10px 15px',
    background: '#ccc',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '10px 15px',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DeleteConfirmation;
