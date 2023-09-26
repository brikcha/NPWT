import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEye } from 'react-icons/fa';

function ConsultationPatient() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button className="btn  blue-button" color="white" onClick={handleShow} >
            <a href="#eyeModal" data-toggle="modal" style={{ color: 'white' }}>
                <FaEye/>
            </a>
        </Button>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Détails Consultation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
          </Modal.Body>
        </Modal>
      </>
    );
  }

export default ConsultationPatient;