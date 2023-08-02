import React, { useState, useEffect, useCallback } from "react";
import "../customerstreams/videostreaming.css";
import ReactPlayer from "react-player";
import axios from "axios";
import { toast } from "react-hot-toast";
import useSWR, { mutate } from "swr";
import Room from "../../screens/LiveRoom";
import LiveRoom from "../../screens/LiveRoom";
import LiveVideo from "../../screens/LiveVideo";
import { AiFillCaretLeft } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { AiFillCaretRight } from "react-icons/ai";
import { MdVideoChat } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import {
  getFirebaseToken,
  onForegroundMessage,
} from "../../notification/firebase";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import { BsFillXCircleFill } from "react-icons/bs";
import { IoMicCircle } from "react-icons/io5";
import { FaRecordVinyl } from "react-icons/fa";
import { TbCircleChevronRight } from "react-icons/tb";
import { FaVideo } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import {FaUserCircle} from 'react-icons/fa'

export default function VideoStreaming() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleClose = () => setIsShow(false);
  const handleShow = () => setIsShow(true);

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

  //--------------------------//
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  const userData = [
    { id: 1,icon:FaUserCircle, name: 'John' },
    { id: 2, icon:FaUserCircle, name: 'Jane' },
  ];

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelect = (event) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);
    setIsOpen(false);
  };


  ///-------------------------------///

  const [allow, setAllow] = useState([]);

  const [showNotificationBanner, setShowNotificationBanner] = useState(
    Notification.permission === "default"
  );

  setInterval(() => {
    onForegroundMessage()
      .then((payload) => {
        console.log("Received foreground message: ", payload);

        const {
          notification: { title, body },
        } = payload;
        localStorage.setItem("ntfnEmail", body);
        toast(<ToastifyNotification title={title} body={body} />);
      })
      .catch((err) =>
        console.log(
          "An error occured while retrieving foreground message. ",
          err
        )
      );
  }, 500);

  const handleGetFirebaseToken = () => {
    // debugger
    try {
      getFirebaseToken()
        .then((firebaseToken) => {
          console.log("Firebase token: ", firebaseToken);
          localStorage.setItem("deviceToken", firebaseToken);
          // localStorage.setItem("deviceToken","yu");
          if (firebaseToken) {
            setShowNotificationBanner(false);
          }
        })
        .catch((err) =>
          console.error(
            "An error occured while retrieving firebase token. ",
            err
          )
        );
    } catch (error) {
      console.log("error:::::", error);
    }
  };

  const [apiagent, setApiAgent] = useState("");
  // console.log("apiagent",apiagent)
  const notify = async () => {
    let deviceToken = localStorage.getItem("deviceToken");
    try {
      const response = await axios.post(
        `https://backend.propalchemy.io/product-service/v1/auth/addDeviceToken`,
        {
          deviceToken: localStorage.getItem("deviceToken"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      // if(st === 'allowed')

      console.log("data", response.data.msg);
      setApiAgent(response.data.msg);
    } catch (error) {
      console.log("data", error.response.msg);
      // setApiAgent(error.response.data.deviceToken);
      // toast.error(error.message);
    }
  };
  useEffect(() => {
    handleGetFirebaseToken();
    notify();
  }, []);

  const allowChat = async (e, st) => {
    try {
      const ntfnEmail = localStorage.getItem("ntfnEmail");
      console.log("emg" + ntfnEmail);
      const res = await axios.post(
        `https://backend.propalchemy.io/product-service/v1/auth/setStatusOfCustomer`,
        {
          email: localStorage.getItem("ntfnEmail"),
          isAllowed: st,
        }
      );
      // toast.success("success");

      setAllow(res.data);
      console.log("data", res);
      // navigate('/videostreaming');
    } catch (error) {
      console.log("all", error);
    }
  };

  const ToastifyNotification = ({ title, body }) => (
    <div
      className="push-notification"
      style={{ borderRadius: "20px", textAlign: "center", width: "300px" }}
    >
      <h2
        className="push-notification-title fs-5  fw-bold"
        style={{ color: "brown", fontFamily: "sans-serif" }}
      >
        {body}
      </h2>
      <p
        className="push-notification-text fs-6 fw-bold border-bottom p-2"
        style={{ color: "black" }}
      >
        Is Requesting to join?
      </p>
      <div className=" d-flex justify-content-center py-2">
        <button
          className="rounded-pill w-50 mx-3 "
          style={{ backgroundColor: "rgb(165, 139, 115)" }}
          onClick={(e) => allowChat(e, "allowed")}
        >
          Allow
        </button>
        <button
          className="rounded-pill w-50"
          onClick={(e) => allowChat(e, "denied")}
        >
          Deny
        </button>
      </div>
    </div>
  );

  const [stream, setStream] = useState([]);
  const [show, setShow] = useState(false);

  // console.log("stream", stream);
  const getStream = async () => {
    try {
      const res = await axios.get(
        `https://backend.propalchemy.io/product-service/v1/client/getVideoIdForAgent`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      // console.log("data", res.data);
      setStream(res?.data?.videoIds);
    } catch (error) {
      // console.log("d", error.response.data);
      setStream(error.response.data.videoIds);

      toast.error(error.message);
    }
  };
  React.useEffect(() => {
    getStream();
    // test();
  }, []);

  return (
    <>
      <div>
       
       
        <div className="video-responsive">
          <div className="App mt-2">
            <div className="youtube_streaming" style={{ position: "relative" }}>
              <div
                className="icons-react"
                style={{ position: "absolute", top: "180px" }}
              >
              <FaUsers size={35} color="white" onClick={handleToggleDropdown}
                
              />
               <div>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            width:'200px',
            right: -190, 
            backgroundColor: '#E9D1BD',
            borderRadius:'15px',
            padding: '10px',
          }}
        >
        <div className="w-100">
          <div value={selectedUser} onChange={handleUserSelect} style={{width:'180px',border:'none'}}>
            {userData.map((user) => (
              <option key={user.id} value={user.id} className="border-bottom border-secondary">
               {user.name}
              </option>
            ))}
          </div>
          {selectedUser && (
            <p>Selected user: {userData.find((user) => user.id === selectedUser).name}</p>
          )}
        </div>
            </div>
      )}
        </div>
        <MdVideoChat onClick={handleShow} size={35} color="white"/>
                <BsFillXCircleFill size={35} color="red" />{" "}
                <IoMicCircle size={40} color="#C1B2A3" />
                <FaVideo size={35} color="#C1B2A3" />
                <FaRecordVinyl size={35} color="#C1B2A3" />{" "}
                <TbCircleChevronRight size={40} color="white" />
              </div>
              <LiveRoom />
              {stream?.length > 0 && (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${stream[0]}`}
                  controls
                  width="100%"
                  height=" calc(100vw/2.25)"
                />
              )}
            </div>
          </div>
        </div>
        <div className="app">
          {showNotificationBanner && (
            <div className="notification-banner"></div>
          )}

          {/* <button
        className=" btn btn-primary"
        onClick={() => toast(<ToastifyNotification title="Are You Sure to join the streaming?" body="please allow the stream" 
        />)}
      >
   notification
      </button>  */}

          <ToastContainer
            hideProgressBar
            position="top-center"
            autoClose={1000}
            style={{ width: "40%" }}
            draggable
            closeButton={false}
          />
        </div>
        <Modal show={isShow} onHide={handleClose}>
          <div className="container d-flex justify-content-center">
            <div className="row bg-light mt-5">
              <h2 className="px-4 fw-bold text-center mt-4">Video Chat</h2>
              <div className="col-6 d-flex justify-content-center">
                <form onSubmit={handleSubmitForm}>
                  <label htmlFor="email">Email ID:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control w-100 bg-light text-dark"
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
                    <button className="rounded-pill btn btn-primary">
                      Join
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
