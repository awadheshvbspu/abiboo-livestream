import React, { useEffect, useState } from "react";
// import "./adminlogin.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../apis/urls";

export default function SetPassword() {
    const navigate= useNavigate();
  // const {} = useSearc
  const { token } = useParams();
  // console.log("fs",fs.token);
//   const [passwordSet, SetPasswordSet] = useState();
  const [tokens, setTokens] = useState();

  const checkToken = async () => {
    try {
        const response = await axios.post(`${URLS.baseUrl}/auth/verifyEmail`, {
            token,
          });
          console.log("response",response.data);
          // navigate('/setpassword')
    } catch (error) {
      toast.error(error);
      navigate('/errormessage')
    }
  };
 useEffect(()=>{
    checkToken();
 },[])
  const handleSetPass = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="backGround-color p-4">
            <div className="col-md-6 offset-md-3">
              <h3>Set Password</h3>
            </div>
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSetPass}>
                <input
                  type="text"
                  className="form-control setPass w-60 rounded-pill"
                  placeholder="Set Password"
                  onChange={(e) => setTokens(e.target.value)}
                />
                <br />
                <div className="reset-button justify-content-center">
                  <button type="submit" className="btn setbutton  btn-primary ">
                    Set  Password
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
