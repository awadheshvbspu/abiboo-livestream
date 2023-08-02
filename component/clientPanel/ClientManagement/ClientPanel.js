import React, { useContext, useState,Suspense, lazy } from "react";
import "./clientPanel.css";
import creates from "../../../assests/icons/createclient.png";
import ClientDetails from "../../../Accounts/ClientDetails/ClientDetails";
import Deletepopup, { ModelContext } from "../../../UseContext/Deletepopup";
import { ApiContextHook } from "../../../UseContext/ApiContext";
import { useApiContextHook } from "../../../UseContext/ApiContext";
import { ApiContext } from "../../../UseContext/DisableContext";
import { NavLink } from "react-bootstrap";
import { TbPencilMinus } from "react-icons/tb";
import {AiOutlineEye} from 'react-icons/ai';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Button from "react-bootstrap/Button";
import {ErrorMessage, Form, Field, Formik } from "formik";
import * as yup from "yup";
import Modal from "react-bootstrap/Modal";
import '../../../../src/modal.css';
import { AuthContexts } from "../../../context/AuthContext";



export default function ClientPanel() {
  const [createclient, setCreateClient] = useState([]);
  const c = useContext(ApiContextHook);
  const { loggedOutUser } = AuthContexts();
  // const { getUserApi, getUsers } = useApiContextHook();
  const {setShowModel,getId} = useContext(ModelContext);
   const {clientUsersApi,clientUser} = useApiContextHook();

  React.useEffect(() => {
    clientUsersApi();
   
  }, []);

  const [isVisible, setisVisible] = useState(false);

  const handlePopup = () => {
    setisVisible(!isVisible);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {createUserApi} = useApiContextHook();

   const validationSchema = yup.object({
    companyName: yup.string().required(),
    username : yup.string().required(),
    email : yup.string().email().required()
  })
  
  const handleSubmit = async(e) => {
    createUserApi(e);
    console.log("e",e);
    handleClose();
   }
 return (
    <>
      <div className="container clientPanel">
        <div className="row panel">
          <div className="col-md-12 col-sm-12">
            <div className="d-flex justify-content-between border-bottom ">
              <div className="dash_heading">
                <h3 className="client-dash">Dashboard</h3>
                <p>See your account information in here!</p>
              </div>
              <div >
                <h6 onClick={loggedOutUser}>
                  Erfan Rezaii
                  <MdOutlineArrowDropDown size={25} />
                </h6>
              </div>
            </div>
          </div>

          {/* {isVisible && <ClientDetails />} */}

          <div className="addbutton d-flex justify-content-end mt-3 mb-3">
            <div className="check fw-bold">
              Create Client
              <img src={creates} onClick={handleShow} height="" width="" />
            </div>
          </div>
          <div className="Details pb-sm-2 row">
          <div className="Cdetails m-5 mb-2">
              <div class="main mx-5">
                <h4 className="fw-bold">Client</h4>
                <div class="form-group has-search">
                  <span class="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
                  <Suspense fallback={<div>loading...</div>}>
                  <div className="col-md-12 col-sm-12 table-responsive">
            <table className="table create_client text-center table-responsive mt-4">
              <thead className="client_table_header">
                <tr className="table-header">
                  <th scope="col">Client Details</th>
                  <th scope="col">Username</th>
                  <th scope="col">Registration Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientUser &&
                  clientUser.map((cur, i) => {
                    return (
                      <tr key={i}>
                        <td>{cur.companyName}</td>
                        <td>{cur.username}</td>
                        <td>{cur.createdAt}</td>
                        <td>{cur.isActive ? 'block':"active"}</td>
                        <td>
                          <div className="icons">
                          <TbPencilMinus size={20}/> <AiOutlineEye size={20}/>
                            &nbsp; <button
                              type="button"
                              className="btndisable me-1"
                              onClick={()=>{
                                getId(cur.id)
                                setShowModel(true)}}
                            >
                              Disable
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            </div>
            </Suspense>
          </div>
        </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="headerModal">
          <Modal.Title className="fw-bold px-3"> Create Client <br/>  <span className="fw-normal fs-6">Create an account for the client!</span>
          </Modal.Title>
           </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ companyName: "", username: "",email:"" }}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mt-3 px-3">
                      <label htmlFor="companyName">Company Name</label>
                      <br />
                      <Field
                        type="text"
                        palceholder="companyName"
                        className="username w-100 form-control px-2"
                        name="companyName"
                        required
                      />
                       <p className="text-danger">
                    <ErrorMessage name="companyName" />
                  </p>
                    </div>
                    <div className="row px-3">
                    <div className="col-6">
                    <div className="form-group mt-3 px-3">
                      <label htmlFor="username">Username</label>
                      <br />
                      <Field
                        type="text"
                        palceholder="Username"
                        className="pass w-100  form-control"
                        name="username"
                        required
                      />
                       <p className="text-danger">
                    <ErrorMessage name="username" />
                  </p>
                    </div>
                    </div>
                    <div className="col-6 ">
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
                    </div>
                    </div>
                  </div>
                </div>
              </div>
          <div className="d-flex justify-content-center p-4">
          <Button
            variant="primary"
            onClick={handleClose}
            className="rounded-pill h-90 text-dark mx-2"
            style={{backgroundColor:"#F1F0EF"}}
          >
            Cancel
          </Button>
          <Button
          type="submit"
            className="rounded-pill h-90 mx-2"
            style={{backgroundColor:"#A58B73"}}
          >
            Save
          </Button>
          </div>
        </Form>
          </Formik>
        </Modal.Body>
      </Modal>
      </div>
    </>
  );
}
