import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modal3() {
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
          <Modal.Title className='fw-bold fs-5' style={{paddingLeft:"12rem"}}>Mute EveryOne?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center fw-bold'>
         This will mute everyone in the meeting except you
    </Modal.Body>
    <div className='px-5 fw-normal'>
       <input type="checkbox" name="allow"  value="yes allow"/>
       <label for="allow">  Allow participants to unmute themselves</label>
        </div>         
       
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

export default Modal3;