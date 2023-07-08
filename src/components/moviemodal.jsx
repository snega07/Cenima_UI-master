import React from 'react';
import { Modal } from 'react-bootstrap';

const ViewReviewModal = ({ showModal, handleClose, movie }) => {
  const { image, title, description, rating } = movie;

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header className='custom-modal-title' style={{ backgroundColor:'#FFA500'}} closeButton>
          <Modal.Title >
            <h3>About</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body" style={{ backgroundColor: 'black' , color:'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            <img src={image} alt={title} style={{ height: '400px', margin: '0 auto', alignSelf: 'center' }} />
            <h4>{title}</h4>
            <p>{description}</p>
            <p>Rating: {rating}</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewReviewModal;
