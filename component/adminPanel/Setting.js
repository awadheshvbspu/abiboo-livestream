import React,{useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { URLS } from "../../apis/urls";
import { toast } from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import { AuthContexts } from "../../context/AuthContext";


export default function Setting() {
  const {token} = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [tokens,setTokens]= useState("");
  // const navigate = useNavigate();
  const { loggedOutUser } = AuthContexts();

// console.log("ex",tokens);
  const verifyToken = async()=>{
    try{
          const res = await axios.post(`${URLS.baseUrl}/auth/verifyForgotPasswordMail`,{
            token
          },{
            headers:{
              'Content-Type':"application/json"
            }
          });
          // console.log("good",res.data);

            toast.success(res.data.msg);
            setTokens(res.data.token)

    }catch(e){
      navigate("/adminPanel");
      // console.log("bad",e.response);
      toast.error(e.response.data.message);
    }
  }

useEffect(()=>{
  if(token)
  {
    verifyToken();
  }
},[])


const vlidationSchema = yup.object({
  password: yup.string().required('Password is required'),
  cpassword:yup.string().required('Confirm Password is required'),
})




 
  const handleSubmit = async (e) => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }
          
    try {
      const response = await axios.post(`${URLS.baseUrl}/auth/createForgotPassword`, {
        password
      },{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${tokens}`
        }
      });
      // setSuccessMessage(response.data.message);
      toast.success(response.data.msg);
      navigate('/adminlogin');
      // Additional logic if needed, such as redirecting to a login page
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <div className="container clientPanel">
        <div className="row panel">
          <div className="col-md-12 col-sm-12">
            <div className="d-flex justify-content-between border-bottom ">
              <div className="dash_heading">
                <h3 className=" setting">Settings</h3>
                <p>Manage your account settings in here!</p>
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

          <div className="Details pb-sm-2 row h-100 mt-5">
            <div className="manage-account m-5 mb-2 col-md-12 col-sm-12">
              <div class="main">
                <h4 className="fw-bold ms-md-4">Manage Account Settings</h4>
              </div>
            </div>
            <div className="manage-account px-5">
            <div className="email_address px-3 py-3">
              <h5>Email Address</h5>
              <p>Your Email Address is ddssaaya@gmail.com</p>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
            <div className="row">
           <Formik initialValues={{password:"",cpassword:""}} validationSchema={vlidationSchema} 
           onSubmit={handleSubmit}
           >
           <Form >
              <div className="px-4 py-3 reset">
                <h5>Password</h5>
                <div className="change-password">
                <div className="cur-pass">
                  <label>Password</label>

                  <Field type="password" className="form-control w-100" name="password"  />
                  <p className="text-danger">
                    <ErrorMessage name="password" />
                  </p>
                </div>
                <div className="new-pass px-5">
                  <label>Confirm Password</label>
                  <Field type="password" className="form-control w-100" name="cpassword"  />
                  <p className="text-danger">
                    <ErrorMessage name="cpassword" />
                  </p>
                </div>
                </div>
              </div>
              <div className="px-4">
                <button type="submit" className="save_button" >Save Password</button>
              </div>
              </Form>
           </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
