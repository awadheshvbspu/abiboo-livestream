import React, { useState, useContext } from "react";
import "./agentlogin.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useApiContextHook } from "../../UseContext/ApiContext";
import { toast } from "react-hot-toast";

export default function AgentLogin() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/admindash");
  const { loginApi } = useApiContextHook();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginApi(username, password);
    // notify();
  };

 

  return (
    <>
      <div className="container admin_dashboard adminagent-login">
        <div className="row admin_login">
          <div className="col-md-12  col-sm-12 admin_login">
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="admin-heading">
                  <h3 className="fw-bold">Client Login</h3>
                </div>
                <div className="admin_email">
                  <label> Username</label> <br />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    required
                    className="admin form-control w-100"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="login_password">
                  <label>Password</label> <br />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    required
                    className="login-password form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <span className="forgot-password">
                  <NavLink
                    to="/resetpasssword"
                    title="Forgot Password"
                    id="link-reset"
                  >
                    Forgot Password?
                  </NavLink>
                </span>

                <div className="login_button">
                  <button
                    type="submit"
                    className="login btn btn-primary"
                    onClick={handleClick}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
