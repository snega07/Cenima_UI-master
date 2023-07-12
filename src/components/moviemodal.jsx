import React from 'react';
import { Modal } from 'react-bootstrap';

const ViewMovieModal = ({ showModal, handleCloseModal, movie }) => {
  const { image, title, description, rating } = movie;

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
        <img
            src={image}
            alt={title}
            style={{ maxHeight: '400px', maxWidth: '100%', margin: '0 auto' }}
          />
          <p>{description}</p>
          <p>Rating: {rating}</p>
        </div>
      </Modal.Body>
     
    </Modal>
  );
};

export default ViewMovieModal;
