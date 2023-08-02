import React, { useState } from "react";
import "./customerdash.css";
import create from "../../assests/icons/add-square.png";
import client from "../../assests/icons/Frame 3.png";
import Agent from "../../assests/icons/Frame 26.png";
import CustStreamCharts from './CustStreamCharts';
import Agents from '../../assests/icons/Frame 26 (1).png';
import { MdOutlineArrowDropDown } from "react-icons/md";
import Modal1 from "../../Modal1";
import AgentLogin from "./AgentLogin";
import Button from "react-bootstrap/Button";
import { Form, Field, Formik } from "formik";
import * as yup from "yup";
import Modal from "react-bootstrap/Modal";
import { AuthContexts } from "../../context/AuthContext";



export default function Agentdashboard() {
  const { loggedOutUser } = AuthContexts();
  const [modalshow,setModalShow] = useState(false);
  const handlelogin = () => {
    setModalShow(!modalshow);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const validationSchema = yup.object({
    AgentName: yup.string().required(),
    password: yup.string().required(),
  });
  const handleSubmit = () => {
    // // e.preventDefault();
    // loginApi(username, password);
    // console.log(e);
  };
  

  const adminData = localStorage.getItem("adminData");
  const totalNoClients = localStorage.getItem("count.clients.total");
  const totalNoCustomers = localStorage.getItem("count.customers.total");
  const activeNoCustomers = localStorage.getItem("count.customers.active");
  
return (
    <>
      <div id="adminPanel" className="h-100  w-100">
        <div className="container-fluid">
          <div className="row ">
            <div className="mt-4 row">
              
                <div className="d-flex justify-content-between border-bottom ">
                <div className="dash_heading">
                  <h3 className="Admin_dash">Dashboard</h3>
                  <p>See your account information in here!</p>
                  </div>
                  {/* {modalshow && <AgentLogin/>
                  } */}
                  <div onClick={loggedOutUser}>
                    <h6>Erfan Rezaii <MdOutlineArrowDropDown
                      size={30}
                    
                      data-bs-toggle="tooltip"
                    /></h6>
                  </div>
                  </div>
              
            </div>
            <div className="createclient p-3">
              <div className=" mt-2 fw-bold">
                Create Customer
              </div>
              <div>
                <img src={create} height='95%' width='95%' />
              </div>
            </div>
          </div>
          <div className="row backGround">
            <div className="p-5">
              <div className="row justify-content-between">
                <div className="col-md-4  client bg-white ">
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
                <div className="col-md-4  client bg-white">
                  <div className="clientInfo">
                    <div className=" clients">
                      <img src={Agent} />
                      <p className="fw-bold">Total Customers</p>
                    </div>
                    <div className="Totalclient">
                      <h3 className='fw-bold'>{totalNoCustomers}</h3>
                      <button type="button" className="clientbutton">
                        see info
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4  client bg-white">
                  <div className="clientInfo">
                    <div className=" clients">
                      <img src={client} />
                      <p className="fw-bold">Active Customers</p>
                    </div>
                    <div className="Totalclient">
                      <h3 className="fw-bold">{activeNoCustomers}</h3>
                      <button type="button" className="clientbutton">
                        see info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-12">
              <CustStreamCharts />
            </div>
          </div>
        </div>
        
      {/* <Modal show={show} onHide={handleClose}  className="modal" aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold"> Agent Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ AgentName: "", password: "" }}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <label htmlFor="exampleInputEmail1" >Agent Name</label>
                      <br />
                      <Field
                        type="text"
                        palceholder="Username"
                        className="   username w-100 h-100 form-control rounded-pill "
                        name="AgentName"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="exampleInputEmail1">Password</label>
                      <br />
                      <Field
                        type="password"
                        palceholder="password"
                        className="pass w-100 h-100 form-control rounded-pill "
                        name="password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer className="border-0 d-flex justify-content-center">
          <Button
            variant="primary"
            onClick={handleClose}
            className="rounded-pill"
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal> */}
      </div>
    </>
  );
}
