import React from "react";
import './createcustomer.css';
import { Field, Formik,Form } from "formik";
import * as yup from 'yup';

export default function Createcustomer() {


  const handleSubmit =(e)=>{
    e.preventDefault();
  }
  const validationSchema = yup.object({
    companyName: yup.string().required(),
    username : yup.string().required(),
  })

  return (
    <>
      <div className="container ClientAccount">
        <div className="row h-100 w-100">
          <div className="col-md-12 col-sm-12 border-0">
              <Formik onSubmit={handleSubmit} initialValues={{companyName:'',username:''}} validationSchema={validationSchema}>
              <Form>
            <div className="create">
              <div className=" create pt-3">
                <h4 className="fw-bold">Create Customer</h4>
                <p>Create an account for the customer!</p>
              </div>
              <div className="company-name p-5">
                <label>Agent Name</label> <br />
                <Field type="text" className="name mt-2 text-light form-control" 
                name="CompanyName"
                placeholder="Agent Name"/>
              </div>
            </div>
            <div className="row userPass">
              <div className="col-md-12 col-sm-12">
                <label>Username</label> <br />
                <Field type="text" className="custuser form-control" 
                name="username"
                placeholder="Username" />
              </div>
            </div>
            <div className="row p-5 buttons">
              <div className="col-5 cancel">
                <button type="button" className="cancelbutton">Cancel</button>
              </div>
              <div className="col-5 save">
                <button type="button" className="savebutton">Save</button>
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
