import React, { useContext, useEffect } from "react";
import "./adminpanel.css";
import create from "../../assests/icons/add-square.png";
import client from "../../assests/icons/Frame 3 (1).png";
import Agent from "../../assests/icons/Frame 26.png";
import Tables from "../adminPanel/Table/Tables";
import Charts from "../../component/adminPanel/Charts";
import Agents from "../../assests/icons/Frame 26 (1).png";
import { useState } from "react";
import axios from "axios";
// import Adminlogin from "../../Accounts/AdminLogin/Adminlogin";
import { useApiContextHook } from "../../UseContext/ApiContext";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../../context/AuthContext";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { modelLogin, setmodelLogins } = useApiContextHook();

  const { loggedOutUser } = AuthContexts();
  const [login, setLogin] = useState(false);
  const handlelogin = () => {
    setmodelLogins(!modelLogin);
  };

  const adminData = localStorage.getItem("adminData");
  const totalNoClients = localStorage.getItem("count.clients.total");
  const totalNoAgents = localStorage.getItem("count.agents.total");
  const totalNoCustomers = localStorage.getItem("count.customers.total");
  const activeNoAgents = localStorage.getItem("count.agents.active");
  const activeNoCustomers = localStorage.getItem("count.customers.active");

  return (
    <>
      <div id="adminPanel" className="h-100  w-100">
        <div className="container-fluid">
          <div className="row ">
            <div className="mt-4 row">
              <div className="d-flex justify-content-between border-bottom ">
                <div className="dash_heading">
                  <h3 className="admin">Dashboard</h3>
                  <p>See your account information in here!</p>
                </div>
                {/* {modelLogin && <Adminlogin />} */}
                <div>
                  <div onClick={loggedOutUser} className="cursor-pointer">
                    Erfan Rezzai
                    <MdOutlineArrowDropDown
                      size={35}
                      data-bs-toggle="tooltip"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="createclient p-3">
              <div className=" mt-2 fw-bold">Create Client</div>
              <div>
                <img src={create} height="95%" width="95%" />
              </div>
            </div>
          </div>
          {/* <Adminlogin/> */}
          <div className="row backGround">
            <div className="p-5">
              <div className="row justify-content-between">
                <div className="col-md-4  col-lg-4  col-sm-12 mb-3 mb-md-0  client bg-white ">
                  <div className="clientInfo ">
                    <div className=" clients">
                      <img src={client} className="w-20 h-20" />
                      <p className="fw-bold">Total Clients</p>
                    </div>
                    <div className="Totalclient">
                      <h3 className="fw-bold ">{totalNoClients}</h3>
                      <button type="button" className="clientbutton">
                        see info
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 mb-3 mb-md-0 client bg-white">
                  <div className="clientInfo">
                    <div className=" clients">
                      <img src={Agent} className="w-20 h-20" />
                      <p className="fw-bold">Total Agents</p>
                    </div>
                    <div className="Totalclient">
                      <h3 className="fw-bold">{totalNoAgents}</h3>
                      <button type="button" className="clientbutton">
                        see info
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12  mb-md-0 client bg-white">
                  <div className="clientInfo">
                    <div className=" clients">
                      <img src={client} className="w-20 h-20" />
                      <p className="fw-bold">Total Customers</p>
                    </div>
                    <div className="Totalclient">
                      <h3 className="fw-bold">{totalNoCustomers}</h3>
                      <button type="button" className="clientbutton">
                        see info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" row mt-5 justify-content-between ">
                <div className="col-md-6 col-sm-12 mb-3 mb-md-0 agent bg-white">
                  <div className=" activeclients">
                    <img src={client} className="w-20 h-20" />
                    <p className="fw-bold">Active Agents</p>
                  </div>
                  <div className="Totalagents">
                    <h3 className="fw-bold">{activeNoAgents}</h3>
                    <button type="button" className="clientbutton">
                      see info
                    </button>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 mb-2 mb-md-0 customers bg-white">
                  <div className=" customerclients">
                    <img src={Agents} className="w-20 h-20" />
                    <p className="fw-bold">Active Customers</p>
                  </div>
                  <div className="Totalagents">
                    <h3 className="fw-bold">{activeNoCustomers}</h3>
                    <button type="button" className="clientbutton">
                      see info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-12">
              <Charts />
            </div>
            <div className="col-md-12 col-sm-12 mt-5">
              <Tables />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
