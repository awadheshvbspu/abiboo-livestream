import React from "react";
// import "./agentsPanel.css";
import { useState, useEffect } from "react";
import creates from "../../../assests/icons/createclient.png";
// import ApiRequest from "../../Accounts/ApiRequest/ApiRequest";
import Resetapi from '../resetapi/Resetapi'
import './customerapitable.css'
import Poprequest from '../PopRequest/Poprequest';
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContexts } from "../../../context/AuthContext";

export default function Customerapitable() {
  const [apidata, setApiData] = useState([]);
  const { loggedOutUser } = AuthContexts();
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
      <div className="container-fluid mt-4">
        <div className="row apimng">
          <div className="col-md-12">
            <div className="d-flex justify-content-between border-bottom ">
              <div className="dash_heading">
                <h3 className="Api_management">API Management</h3>
                <p>See your API information in here!</p>
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
          {/* <Resetapi/> */}
          {/* <Poprequest/> */}
          
          <div className="agentspanel mt-5">
          <div className="Cdetails m-5 mb-2">
              <div class="main mx-5">
                <h4 className="fw-bold">API Management</h4>
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
                    <th scope="col">Key</th>
                    <th scope="col">Activation Date</th>
                    <th scope="col">Client ID</th>
                    <th scope='col'>Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apidata &&
                    apidata.map((cur, i) => {
                      return (
                        <tr key={i}>
                          <td>{cur.key}</td>
                          <td>{cur.createdAt}</td>
                        <td>{cur.clientId}</td>
                          <td>{cur.isActive ? "block" : "active"}</td>
                          <td>
                            <div className="icons">
                              
                              &nbsp;
                              <button
                                type="button"
                                style={{ backgroundColor: "#282624",color:'white' }}
                                className="btn-Approve"
                                // onClick={handleShow}
                                // onClick={()=>{
                                //   getId(cur.id)
                                //   setShowModel(true)}}
                              >
                                Edit API
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
      </div>
    </>
  );
}

