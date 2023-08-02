import React, { useContext, useRef } from "react";
// import "./adminlogin.css";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useApiContextHook } from "../../UseContext/ApiContext";

export default function Agentlogin() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/customerdashboard");
  const { loginApi } = useApiContextHook();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const { loginApi } = useContext(ApiContexts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginApi(username, password);
    console.log(e);
  };
  // console.log(email)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="container admin_dashboard">
        <div className="row admin_login">
          <div className="col-md-12  col-sm-12 admin_login">
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="admin-heading">
                  <h3 className="fw-bold">Agent Login</h3>
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
                <div className="login_password" >
                  <label>Password</label> <br />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter Password"
                    required
                    className="login-password form-control w-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* {passwordVisible ? (
                    <AiOutlineEyeInvisible size={20} onClick={togglePasswordVisibility} />
                  ) : (
                    <AiOutlineEye size={20} onClick={togglePasswordVisibility} />
                  )} */}
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

