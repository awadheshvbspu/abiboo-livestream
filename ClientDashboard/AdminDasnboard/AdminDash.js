import React from "react";
import { useState } from "react";
import create from "../../assests/icons/add-square.png";
import client from "../../assests/icons/Frame 3.png";
import Agent from "../../assests/icons/Frame 26.png";
import Charts from "../../component/adminPanel/Charts";
import Agents from "../../assests/icons/Frame 26 (1).png";
import StreamCharts from '../AdminDasnboard/StreamCharts';
import './admindash.css';
import AgentLogin from "../../ClientDashboard/AdminDasnboard/AgentLogin";
import { AuthContexts } from "../../context/AuthContext";

export default function AdminDash() {
  const { loggedOutUser } = AuthContexts();

  const [agentlogin, setAgentLogin] = useState(false);
  const handleAgentlogin = () => {
    setAgentLogin(!agentlogin);
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
                  <h3 className="Client_dash">Dashboard</h3>
                  <p>See your account information in here!</p>
                  </div>
                  <div onClick={loggedOutUser}>
                    <h6>Erfan Rezaii<i className='fas fa-sort-down' style={{ fontSize: '24px' }}   onClick={handleAgentlogin}></i></h6>
                  </div>
                  </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className="ApiKey mt-4">
                <button type="button" className="ApiButton">
                  Set Api Key
                </button>
              </div>

              {/* {agentlogin && <AgentLogin/>} */}
              <div className="createclient p-3">
                <div className=" mt-2 fw-bold">Create Agent</div>
                <div>
                  <img src={create} height="95%" width="95%"/>
                </div>
              </div>
            </div>
          </div>
          <div className="row backGround">
            <div className="p-5">
              <div className="row justify-content-between">
                <div className="col-md-4 col-sm-12 mb-3 mb-md-0 client bg-white ">
                  <div className="clientInfo ">
                    <div className=" clients">
                      <img src={client} />
                      <p className="fw-bold">Total Streams</p>
                    </div>
                    <div className="Totalclient">
                      <h3 className="fw-bold">{totalNoClients}</h3>
                      <button type="button" className="clientbutton">
                        see info
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 mb-3 mb-md-0 client bg-white">
                  <div className="clientInfo">
                    <div className=" clients">
                      <img src={Agent} />
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
                      <img src={client} />
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
                    <img src={client} />
                    <p className="fw-bold">Active Agents</p>
                  </div>
                  <div className="Totalagents">
                    <h3 className="fw-bold">{activeNoAgents}</h3>
                    <button type="button" className="clientbutton">
                      see info
                    </button>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 mb-md-0 agent bg-white">
                  <div className=" customerclients">
                    <img src={Agents} />
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
            <div className="col-md-12 mt-5">
              <StreamCharts />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
