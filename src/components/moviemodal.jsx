import React from 'react';
import { Modal } from 'react-bootstrap';

const ViewMovieModal = ({ showModal, handleCloseModal, movie }) => {
  const { image, title, description, rating } = movie;

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered  style={{ zIndex: "1050" }}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflowY: "auto", maxHeight:"calc(100vh - 200px)" }}>
        <div className="text-center">
        <img
            src={image}
            alt={title}
            style={{ maxHeight: '350px', maxWidth: '100%', margin: '0 auto', }}
          />
          <p>{description}</p>
          <b>Rating: {rating}</b>
        </div>
      </Modal.Body>
     
    </Modal>
  );
};

export default ViewMovieModal;
