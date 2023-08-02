import React from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customer.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../assests/abiboologo.png";
import { CiStreamOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import '../customermanagement/customerstreams/videostreaming.css'
import ReactPlayer from "react-player";
import  {useCallback } from "react";
import { ErrorMessage, Form, Field, Formik } from "formik";
import * as yup from "yup";
import LiveRoom from "../screens/LiveRoom";
import LiveVideo from "../screens/LiveVideo";
import { useSocket } from "../context/SocketProvider";
import {BsFillXCircleFill} from 'react-icons/bs';
import {IoMicCircle} from 'react-icons/io5';
import {FaRecordVinyl} from 'react-icons/fa';
import {TbCircleChevronRight} from 'react-icons/tb';
import {FaVideo} from 'react-icons/fa';
import {MdVideoChat} from 'react-icons/md';
import { FaUsers } from "react-icons/fa";
import {FaUserCircle} from 'react-icons/fa'



export default function Customer() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [isShow, setIsShow] = useState(false);
   
  const handleClosed = () => setIsShow(false);
  const handleShows = () => setIsShow(true);

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
  ///-------------------------///
  const [issOpen, setIssOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  const userData = [
    { id: 1,icon:FaUserCircle, name: 'John' },
    { id: 2, icon:FaUserCircle, name: 'Jane' },
  ];

  const handleToggleDropdown = () => {
    setIssOpen(!issOpen);
  };

  const handleUserSelect = (event) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);
    setIsOpen(false);
  };
  //-----------------------------//
  const [show, setShow] = useState(false);
  const [callCust, setCallCust] = useState(null);
  const [check, setCheck] = useState(false);
  const [stream, setStream] = useState("");
  const [apiStatus, setApiStatus] = useState("pending");
  const [allowData, setAllowData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  //
  const [canJoin, setCanJoin] = useState('');
  const [videoId, setVideoId] = useState('');
  const [error, setError] = useState(null);

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setShow(true);
  const [loginshow, setLoginShow] = useState(false);
  const [popstreams, setPopupStreams] = useState([]);

  const validationSchema = yup.object({
    email: yup.string().email().required("This field is required!"),
  });

  useEffect(()=>{
    setIsOpen(true);
    
  },[])


  
  // console.log("state of isopen "+isOpen)
 
  const popUpstream = async (e, { resetFom }) => {
    localStorage.setItem("email", e.email);
  
    try {
      const res = await axios.post(
        `https://backend.propalchemy.io/product-service/v1/auth/sendRequest`,
        e
      );
      toast.success("success");
      setPopupStreams("popstream", res.data.message);
      handleClose();
      resetFom();

    } catch (error) {
      console.log("app", error.response.data);
      setPopupStreams(error.response.data.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    
    const fetchData = async () => {
      try{
      const response = await axios.get('https://backend.propalchemy.io/product-service/v1/auth/canCustomerJoin/test1112@yopmail.com');
      console.log("0r000es"+response)

      const res = response.data;
      //const data = Object.entries(res);
      const data =res
      console.log(data)

      console.log("data "+(typeof data))
      const status=data.canJoin
      console.log((typeof status))
      setCanJoin(status);

      if (status === 'allowed') {
        const videoId=data.videoId
        console.log("videoId"+videoId)
        console.log((typeof videoId))
        setVideoId(videoId);
      } else if (status === 'pending') {
        setTimeout(fetchData, 5000); // Retry after 5 seconds for pending
      }
      else {
        //setError('Invalid response');
        console.log("response is ---")
        setTimeout(fetchData, 5000)
      }
    } 
      catch (error) {
      setError('Error fetching data');
    }
    };
    

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  

  return (
    <>
   {/* <LiveRoom/> */}
    <div>
    
    {canJoin === 'allowed' && typeof videoId === 'string' &&
     (
      <div className="video-container">
       
        <div className="row">
          
          <div className="row mt-3 mh-100">
            <div className="col-12">
            <div className="youtube_streaming" style={{ position: "relative" }}>
              <div className="icons-react" style={{ position: "absolute" , top:"180px"}}>
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
        <MdVideoChat onClick={handleShows} size={35} color="white"/>
                <BsFillXCircleFill size={35} color="red" />{" "}
                <IoMicCircle size={40} color="#C1B2A3" />
                <FaVideo size={35} color="#C1B2A3" />
                <FaRecordVinyl size={35} color="#C1B2A3" />{" "}
                <TbCircleChevronRight size={40} color="white" />
              </div>
              <LiveRoom />
                  <ReactPlayer
                  key={stream}
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    playing={true}
                    width="100vw"
                    height=" calc(100vw/2.20)"
                  />
               
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {canJoin === 'denied' && (
      <div className="denied-container">
        <p>Denied</p>
      </div>
    )}
  </div>
  <div>
     <Modal show={isShow} onHide={handleClosed}>
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
        <button className="rounded-pill btn btn-primary">Join</button>
        </div>
      </form>
    </div>
    </div>
    </div>
    </Modal>
     </div>
      <div className="container-fluid">
    
        
        <Modal show={isOpen} onHide={handleClose} >
          <Formik
            onSubmit={popUpstream}
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="container popupstreams mt-5">
                <div className="row">
                  <div className="col-12">
                    <div className="row ">
                      <div className="col-6 popupforstrem ">
                        <span className="lead fw-bold d-flex justify-content-center mt-4">
                          Request for joining?
                        </span>
                        <div className="form-group mt-3 px-3">
                          <label htmlFor="email">Email ID</label>
                          <br />
                          <Field
                            type="email"
                            palceholder="email"
                            className="pass w-100 form-control"
                            name="email"
                            required
                          />
                          <p className="text-danger">
                            <ErrorMessage name="email" />
                          </p>
                        </div>
                        <div className="d-flex justify-content-center p-3">
                          <Button
                            type="submit"
                            className="rounded-pill h-90 mx-2 w-75"
                            style={{ backgroundColor: "#A58B73" }}
                            data-dismiss="modal"
                          >
                            Send Request
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </Modal>
      </div>
    </>
  );
}
