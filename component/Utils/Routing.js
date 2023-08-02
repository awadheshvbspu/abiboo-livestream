import React,{useState} from "react";
import { Routes, Route} from "react-router-dom";
import Login from "../../LoginAll/Login";
import { Navigation } from "../../apis/Navigation";
import LiveVideo from "../../screens/LiveVideo";
import LiveRoom from '../../screens/LiveRoom';
import Agentdashboard from "../../customermanagement/customerdash/Agentdashboard";
import AdminDash from "../../ClientDashboard/AdminDasnboard/AdminDash";
import AdminPanel from "../adminPanel/AdminPanel";
import Customer from "../../customer/Customer";
import StreamLogin from "../../customermanagement/customerstreams/StreamLogin";

export default function Routing() {
  
  return (
    <>
      <div className="container-fluid">
        <div className="row nav h-100">
          <Routes>
          {Navigation.length>1 && 
                  Navigation.filter((cur)=>cur.role === localStorage.getItem("role")).map((cur)=>{
                    return <Route  exact path={cur.to} Component={cur.Component} />

                  })
              }
              {/* <Route path="/streamlogin" element={<StreamLogin/>}/>
              <Route path="/agent/dashboard" element={<Agentdashboard />} />
              <Route  path="/adminpanel" element={<AdminPanel />} />
              <Route path="/admindash" element={<AdminDash />} /> */}
              <Route  exact path='/' element={<Login/>} />
              {/* <Route path="/livevideo" element={<LiveVideo />} /> */}
            {/* <Route path="/room/:roomId" element={<LiveRoom />} /> */}
            <Route path='/customer' element={<Customer/>} />
            {/* <Route path='*' element={<h1>404</h1>}/> */}
            
            </Routes>
            
            
        </div>
        
      </div>
    </>
  );
}
