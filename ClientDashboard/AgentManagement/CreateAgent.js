import React, { useState } from "react";
import "./createagent.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useApiContextHook } from "../../UseContext/ApiContext";

export default function CreateAgent() {
  const [inputValue, setInputValue] = useState("Value form onchanges");
  // const {setResponseData} = useContext(ApiContexts);
  const {createUserApi} = useApiContextHook();
  
  const validationSchema = yup.object({
    companyName: yup.string().required(),
    username : yup.string().required(),
    email : yup.string().required(),
  })

  const handleSubmit = async(e) => {
    // e.preventDefault()
    createUserApi(e);
   
  }

  const handleCancel = () => {
    setInputValue("");
  };
  const handleSave = (event) => {
    console.log(inputValue, event);
  };
  
  return (
    <>
    <div className="container ClientAccount">
        <div className="row h-100 w-100">
          <div className="col-md-12 col-sm-12 border-0">
          <Formik onSubmit={handleSubmit} initialValues={{companyName:'',username:'',email:''}} validationSchema={validationSchema}>
            <Form>
              <div className="create">
                <div className=" create pt-3 ">
                  <h4>Create Agent</h4>
                  <p>Create an account for the agent!</p>
                </div>

                <div className="company-name px-5 mt-4">
                  <label>Agent Name</label> <br />
                  <Field
                    type="text"
                    name="companyName"
                    className="name mt-2 form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="companyName" />
                  </p>
                </div>
              </div>
              
              <div className="row userPass mt-4">
                <div className="col-md-6 col-sm-12">
                  <label>Username</label> <br />
                  <Field
                    type="text"
                    name="username"
                    className="user form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="username" />
                  </p>
                </div>
                <div className="col-md-6 col-sm-12">
                  <label>Email ID</label> <br />
                  <Field
                    type="text"
                    name="email"
                    className="emailId form-control"
                  />
                   <p className="text-danger">
                    <ErrorMessage name="email" />
                  </p>
                </div>
              </div>
              <div className="row p-4 ms-5 mt-1 buttons">
                <div className="col-5 cancel">
                  <button
                    type="button"
                    className="cancelbutton"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-5 save">
                  <button
                    type="submit"
                    className="savebutton"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

      