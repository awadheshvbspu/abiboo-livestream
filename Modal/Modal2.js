import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modal2() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton >
          <Modal.Title className='fw-bold fs-5' style={{paddingLeft:"12rem"}}>Request for Joining</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
         Cameron william for wants to joining the meeting.
         <p>Allow the user to view the stream.</p>
    </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center border-0'>
          <Button  onClick={handleClose} className='rounded-pill text-dark' style={{backgroundColor:"#F1F0EF"}}>
            Deny
          </Button>
          <Button  className='rounded-pill' style={{backgroundColor:"#A58B73"}}>Allow</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modal2;