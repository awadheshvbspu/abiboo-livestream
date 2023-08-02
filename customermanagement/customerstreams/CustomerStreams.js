import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CiStreamOn } from "react-icons/ci";
import { NavLink } from "react-router-dom";

function CustomerStreams() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavLink exact to="/streamlogin">
        <button className="btn btn-primary w-25">Login</button>
      </NavLink>
      <CiStreamOn onClick={handleShow} color="blue" size={40} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="fw-bold fs-5"
            style={{ paddingLeft: "12rem" }}
          >
            Want ot join the meeting?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <span>If you want to join the meeting allow or reject! </span>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center border-0">
          <Button
            onClick={handleClose}
            className="rounded-pill text-dark"
            style={{ backgroundColor: "#F1F0EF" }}
          >
            Deny
          </Button>
          <Button
            className="rounded-pill"
            style={{ backgroundColor: "#A58B73" }}
          >
            Allow
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerStreams;
