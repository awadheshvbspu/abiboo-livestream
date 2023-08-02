import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import Draggable from 'react-draggable';
import {FaDotCircle} from 'react-icons/fa';
import pause from '../assests/micunmute.svg';
import mic from '../assests/webcam.svg';

const LiveRoom = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

const toggleAudio = () => {
    setIsAudioMuted((prevMuted) => !prevMuted);
  };

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);



  return (
    <div>
      
      
      <h4 className="d-flex justify-content-end">{remoteSocketId}</h4>
      {/* <h4 className="d-flex justify-content-end">{remoteSocketId ? <FaDotCircle color="green"/> :<FaDotCircle color="red"/> }</h4> */}
      <div className="m-4 d-flex justify-content-end ">
        {myStream && (
          <button
            onClick={sendStreams}
            className="rounded-pill btn btn-primary"
           
          >
            Send
          </button>
        )}
        {remoteSocketId && (
          <button
            onClick={handleCallUser}
            className="rounded-pill mt-2 btn btn-secondary"
          >
            CALL
          </button>
        )}
      </div>
      <div className="d-flex" style={{position:'absolute',right:'-26rem'}}>
      {myStream && (
        <>
        
        <Draggable>
        <div className="w-25">
        <div className="mic-pause">
        </div>
          {/* <h3 className="fw-bold">My Stream</h3> */}
          <ReactPlayer
            playing
            muted={isAudioMuted}
            controls
            height="100%"
            width="90%"
            url={myStream}
            draggable
            
          />
          </div>
          </Draggable>
        </>
      )}
      {remoteStream && (
        <>
        
        <Draggable>
        <div className='w-25'>
        <div className="mic-pause">
        {/* <img src={pause} alt="pause" height='20' width='20'/>
        <img src={mic} alt="microphone" height='20' width='20' /> */}
        </div>
          {/* <h3 className="fw-bold">Remote Stream</h3> */}
          <ReactPlayer
            playing
            controls
            muted={isAudioMuted}
            height="100%"
            width="90%"
            url={remoteStream}
            draggable
          />
          </div>
          </Draggable>
        </>
      )}
      </div>
    </div>
  );
};

export default LiveRoom;
