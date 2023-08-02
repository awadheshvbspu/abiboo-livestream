import React,{useState} from "react";
import { Formik,ErrorMessage,Form,Field } from "formik";
import * as Yup from "yup";
import './login.css';
import { toast } from 'react-toastify';
import { useApiContextHook } from "../UseContext/ApiContext";

import LiveVideo from "../screens/LiveVideo";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters"),
});

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
    const { loginApi } = useApiContextHook();
    const naviagte = useNavigate();

    const handleSubmit = async (e,role) => {
      loginApi(e.username, e.password);
      // toast.success("Thank You for login!");
      setLoggedIn(true);
      setRole(role);
      naviagte('/adminpanel')
      
    };

  
  return (
    <>
    {!loggedIn ? (
      <Formik
        validationSchema={validationSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}>
          <Form className="login mt-5 " style={{minHeight:"100vh"}}>
            <div className="form d-flex justify-content-center align-items-center">
              <div className="bg-white p-5 align-self-center mt-5">
              <div className="text-center">
                <span className="fw-bold text-primary fs-4">Welcome to PropAlchemy!!</span>
                <br/>
                <span className="mt-3 fw-bold">Log In</span>
              </div>
              <br/>
              <label htmlfor='username'>Username</label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  className="form-control inp_text w-100"
                  id="username"
                />
              
              <p className="text-danger">
                    <ErrorMessage name="username" />
                  </p>
                <label  htmlfor='password'>Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="form-control"
                />
              <p className="text-danger">
                    <ErrorMessage name="password" />
                  </p>
                <div className="text-center">
                <button type="submit" className="btn btn-primary rounded-pill">Login</button>
                </div>
              </div>
            </div>
          </Form>
      </Formik>
      ) : (
        <div>
        </div>
      )}
     
</>
  );
}

export default Login;


