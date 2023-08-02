import React,{useContext,useState} from 'react';
import creates from '../../assests/icons/createclient.png';
import { ApiContextHook,useApiContextHook} from "../../UseContext/ApiContext";
import { TbPencilMinus } from "react-icons/tb";
import {AiOutlineEye} from 'react-icons/ai';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import ApiRequestApprove, { ModelContext } from "../../ClientDashboard/apirequesttable/ApiRequestApprove";
import { AuthContexts } from '../../context/AuthContext';

export default function ApiRequest() {
  const c = useContext(ApiContextHook);
  // const {setShowModel,getId} = useContext(ModelContext);
   const {clientUsersApi,clientUser} = useApiContextHook();
   const { loggedOutUser } = AuthContexts();

  React.useEffect(() => {
    clientUsersApi();
   
  }, []);
  
  const [apiRequest, setApiRequest] = useState(false);
  const handleapi = () => {
    setApiRequest(!apiRequest);
  };
  return (
    <>
      <div className="container clientPanel">
        <div className="row panel">
          <div className="col-md-12 col-sm-12">
            <div className="d-flex justify-content-between border-bottom ">
              <div className="dash_heading">
                <h3 className="client-dash">API Request</h3>
                <p>Manage Agent's API Request in here!</p>
              </div>
              <div>
                <h6 onClick={loggedOutUser}>
                  Erfan Rezaii
                  <MdOutlineArrowDropDown size={25}/>
                </h6>
              </div>
            </div>
          </div>
          {/* <ApiRequestApprove /> */}
         

          <div className="addbutton d-flex justify-content-end mt-3 mb-3">
            <div className="check fw-bold">
              Create Client
              <img src={creates}  height="" width="" />
            </div>
          </div>
          <div className="Details pb-sm-2 row">
            <div className="Cdetails m-5 mb-2 col-md-12 col-sm-12">
              <div class="main">
                <h4 className="fw-bold ms-md-4">Request to change API</h4>
                <div class="form-group has-search col-sm-2 me-5">
                  <span class="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                  />
                {/* <CiSearch/> */}
                </div>
              </div>
            </div>
                  {/* <Suspense fallback={<div>loading...</div>}> */}
                  <div className="col-md-12 col-sm-12">
            <table className="table create_client text-center table-responsive mt-4">
              <thead className="client_table_header">
                <tr className="table-header">
                  <th scope="col">Customer Details</th>
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
                        <td>{cur.email}</td>
                        <td>{cur.isActive ? 'block':"active"}</td>
                        <td>
                        <div className="apibutton">
                        <button type="button" className="btn-discard">
                          Discard
                        </button> &nbsp;
                        <button type="button" className="btn-Approve">
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
            {/* </Suspense> */}
          </div>
        </div>
      </div>
    </>
  );
}

