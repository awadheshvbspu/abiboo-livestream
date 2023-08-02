import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import Modal from "react-bootstrap/Modal";

const LiveVideo = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      // navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <Modal show={show} onHide={handleClose} className="border-0">
    <div className="container d-flex justify-content-center">
    <div className="row bg-light mt-5">
      <h2 className="px-4 fw-bold text-center mt-4">Welcome to VideoChat</h2>
    <div className="col-6 d-flex justify-content-center">
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID:</label>
        <input
          type="email"
          id="email"
          className="form-control w-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <div className="">
        <label htmlFor="room">Room Number:</label>
        <input
          type="text"
          id="room"
          className="form-control w-100"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        </div>
        <br />
        <div className="p-3 w-25">
        <button className="rounded-pill btn btn-primary">Join</button>
        </div>
      </form>
    </div>
    </div>
    </div>
    </Modal>
  );
};

export default LiveVideo;
