import React, { useContext, useState } from "react";
import "./customerdatatable.css";
import create from "../../assests/icons/add-square.png";
import Createcustomer from "./createcustomer";
import { TbPencilMinus } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Deletepopup, { ModelContext } from "../../UseContext/Deletepopup";
import { ApiContextHook } from "../../UseContext/ApiContext";
import { useApiContextHook } from "../../UseContext/ApiContext";
import Button from "react-bootstrap/Button";
import { ErrorMessage,Form, Field, Formik } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import "../../modal.css";
import { useFormik } from "formik";
import { AuthContexts } from "../../context/AuthContext";

export default function CustomerDataTable() {
  const formik = useFormik({
    initialValues:{companyName:'', username:'', email:''},
    validationSchema: Yup.object({
      
    }),
    onSubmit: values=>{
      createUserApi(formik.values.companyName,formik.values.username,formik.values.email);
      handleClose();
    }
  })
  const [createclient, setCreateClient] = useState([]);
  const c = useContext(ApiContextHook);
  const { loggedOutUser } = AuthContexts();

  const { setShowModel, getId } = useContext(ModelContext);
  const { clientUsersApi, clientUser } = useApiContextHook();

  React.useEffect(() => {
    clientUsersApi();
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const validationSchema = yup.object({
  //   companyName: yup.string().required(),
  //   password: yup.string().required(),
  //   email: yup.string().required(),
  // });
  // const handleSubmit = ( ) => {
  //   console.log(formik.values.companyName)
    
  // };
  const { createUserApi } = useApiContextHook();
  const [data, setData] = useState(false);

  const handlePopup = () => {
    setData(!data);
  };
  return (
    <>
      <div className="container clientPanel">
        <div className="row panel">
          <div className="col-md-12 col-sm-12">
            <div className="d-flex justify-content-between border-bottom ">
              <div className="dash_heading">
                <h3 className="Customer_Mng">Customer Management</h3>
                <p>See your customer information in here!</p>
              </div>
              <div>
                <h6>
                  Erfan Rezaii
                  <i
                    className="fas fa-sort-down"
                    style={{ fontSize: "24px" }}
                    onClick={loggedOutUser}
                  ></i>
                </h6>
              </div>
            </div>
          </div>

          {/* {
              data &&
          <Createcustomer/>
          } */}
          <div className="addbutton d-flex justify-content-end mt-3 mb-3">
            <div className="check fw-bold">
              Create Customer
              <img src={create} onClick={handleShow} height="" width="" />
            </div>
          </div>
          <div className="Details pb-sm-2">
            <div className="Cdetails m-5 mb-2">
              <div class="main">
                <h4 className="Customer_heading">Customer</h4>
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
            <div></div>
            <div className="col-md-12 col-sm-12">
              <table className="table create_client text-center table-responsive mt-4">
                <thead className="client_table_header">
                  <tr className="table-header">
                    <th scope="col">Customer Details</th>
                    <th scope="col">Emails</th>
                    <th scope="col">Registration Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {
                    clientUser?.map((cur, i) => {
                      return (
                        <tr key={i}>
                          <td>{cur.companyName}</td>
                          <td>{cur.email}</td>
                          <td>{cur.createdAt}</td>
                          <td>{cur.isActive ? "block" : "active"}</td>
                          <td>
                            <div className="icons">
                              <TbPencilMinus size={20} />{" "}
                              <AiOutlineEye size={20} />
                              &nbsp;{" "}
                              <button
                                type="button"
                                className="btndisable me-1"
                                onClick={() => {
                                  getId(cur.id);
                                  setShowModel(true);
                                }}
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
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="headerModal">
            <Modal.Title className="fw-bold px-3">
              Create Customer <br />
              <p className="fw-normal fs-6">
                Create an account for the customer!
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
             
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group mt-3 px-3">
                        <label htmlFor="companyName">Customer Name</label>
                        <input
                          type="text"
                          id='companyName'
                          palceholder="companyName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.companyName}
                          className="username w-100 form-control px-2"
                          name="companyName"
                        />
                        {/* <p className="text-danger">
                          <ErrorMessage name="companyName" />
                        </p> */}
                      </div>
                      <div className="row px-3">
                        <div className="col-6 px-3">
                          <div className="form-group mt-3">
                            <label htmlFor="username">Username</label>
                            <br />
                            <input
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.username}
                              type="text"
                              palceholder="Username"
                              className="pass w-100  form-control"
                              id="username"
                              name="username"
                              required
                            />
                            {/* <p className="text-danger">
                              <ErrorMessage name="username" />
                            </p> */}
                          </div>
                        </div>
                        <div className="col-6 px-3">
                          <div className="form-group mt-3">
                            <label htmlFor="email">Email ID</label>
                            <br />
                            <input
                            onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                              type="text"
                              palceholder="email"
                              className="pass w-100 form-control"
                              id="email"
                              name="email"
                              required
                            />
                            {/* <p className="text-danger">
                              <ErrorMessage name="email" />
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-0 d-flex justify-content-center pb-5">
                <Button
                  variant="primary"
                  onClick={handleClose}
                  className="rounded-pill h-90 text-dark mx-2"
                  style={{ backgroundColor: "#F1F0EF" }}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  className="rounded-pill h-90 mx-2"
                  style={{ backgroundColor: "#A58B73" }}
                >
                  Save
                </Button>
                </div>
            </form>
          </Modal.Body>
          {/* <div className="border-0 d-flex justify-content-center pb-5">
          </div> */}
        </Modal>
      </div>
    </>
  );
}
