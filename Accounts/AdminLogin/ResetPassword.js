import React from "react";
// import "../AdminLogin/adminlogin.css";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URLS } from "../../apis/urls";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const Notify = () =>
    toast.success("Reset Successfully!", {
      position: "top-center",
    });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URLS.baseUrl}/auth/forgotPassword`, {
        email,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div class="container forgot_pass">
        <div class="row">
          <div class="col-md-4 col-md-offset-4 bg-white">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="text-center ">
                  <h3>
                    <i class="fa fa-lock fa-2x"></i>
                  </h3>
                  <h2 class="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  {successMessage && <p>{successMessage}</p>}
                  <div class="panel-body">
                    <form
                      id="register-form"
                      role="form"
                      autocomplete="off"
                      class="form"
                      method="post"
                      onSubmit={handleSubmit}
                    >
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon">
                            <i class="glyphicon glyphicon-envelope color-blue"></i>
                          </span>
                          <input
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            class="form-control"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <button
                          name="recover-submit"
                          class="btn btn-primary mt-4"
                          onClick={Notify}
                          type="submit"
                        >
                          Reset Password
                        </button>
                        <ToastContainer />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
