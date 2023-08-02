import React from "react";
import "./agentsPanel.css";
import { useState, useEffect } from "react";
import creates from "../../assests/icons/createclient.png";
import ApiRequest from "../../Accounts/ApiRequest/ApiRequest";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AgentPanel() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [apidata, setApiData] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get(
        `https://backend.propalchemy.io/product-service/v1/client/getKey`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
        console.log("data",res.data)
        setApiData(res?.data?.keys);
      } catch (error) {
        // console.log("s",error)
        toast.error(error.message);
      }
  };
  React.useEffect(() => {
    getUsers();
  }, []);
  const [key, setKey] = useState(false);

  const handleApi = () => {
    setKey(!key);
  };
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row apimng">
          <div className="col-md-12">
            <div className="d-flex justify-content-between border-bottom ">
              <div className="dash_heading">
                <h3 className="APi_request">API Request</h3>
                <p>Manage Agents API request in here!</p>
              </div>
              <div>
                <h6>
                  Erfan Rezaii
                  <i
                    className="fas fa-sort-down"
                    style={{ fontSize: "24px" }}
                  ></i>
                </h6>
              </div>
            </div>
          </div>
          {/* <ApiRequest /> */}
          <div className="addbutton d-flex justify-content-end mt-3 mb-3">
            <div className="check">
              Create Client
              <img
                src={creates}
                onClick={handleApi}
                height="40px"
                width="40px"
              />
            </div>
          </div>

          <div className="Details pb-sm-2 row">
            <div className="Cdetails m-5 mb-2">
              <div class="main mx-5">
                <h4 className="fw-bold">Request to change API</h4>
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
            <div className="col-md-12 col-sm-12 table-responsive">
              <table className="table create_client text-center table-responsive mt-4">
                <thead className="client_table_header">
                  <tr className="table-header">
                    <th scope="col">Username</th>
                    <th scope="col">Key</th>
                    <th scope="col">Activation Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apidata &&
                    apidata.map((cur, i) => {
                      return (
                        <tr key={i}>
                          <td>{cur.createdBy}</td>
                          <td>{cur.key}</td>
                          <td>{cur.createdAt}</td>
                          <td>{cur.isActive ? "block" : "active"}</td>
                          <td>
                            <div className="icons">
                              <button className="btn-discard rounded-pill">Discard</button>
                              &nbsp;
                              <button
                                type="button"
                                style={{ backgroundColor: "#A58B73" }}
                                className="btn-Approve rounded-pill"
                                onClick={handleShow}
                                // onClick={()=>{
                                //   getId(cur.id)
                                //   setShowModel(true)}}
                              >
                                Approve
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
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold px-2">
              Are you sure? <br />
              <span className="fw-normal fs-6">
                This will allow client to reset the api key
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer className="d-flex justify-content-center py-4">
            <Button
              style={{ backgroundColor: "#F1F0EF" }}
              onClick={handleClose}
              className="rounded-pill text-dark"
            >
              Discard
            </Button>
            <Button
              className="rounded-pill"
              style={{ backgroundColor: "#A58B73" }}
            >
              Approve
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
