import React, { useState } from "react";
import "../ApiRequest/apirequest.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function ApiRequest() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [apiRequest,setApiRequest] = useState("Approve for API");

  const handleDiscard = () =>{
        setApiRequest("");
  }
   
  const handleApprove = (event) =>{
    console.log(apiRequest,event);
  }
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
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?  <br/><p>This will allow client to reset the api key</p></Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Discard
          </Button>
          <Button variant="primary">Approve</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}





