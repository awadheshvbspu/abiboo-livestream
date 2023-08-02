import React, { useState } from "react";
import { ErrorMessage, Form, Field, Formik } from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import "./videostreaming.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function StreamLogin() {
  const [loginshow, setLoginShow] = useState(false);
  const [popstreams, setPopupStreams] = useState([]);

  const handleClose = () => setLoginShow(false);
  const handleShow = () => setLoginShow(true);

  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup.string().email().required("This field is required!"),
  });
  const popUpstream = async (e, { resetFom }) => {
    localStorage.setItem("email", e.email);
    handleClose();
    try {
      // const dismiss = toast.loading("processing");
      const res = await axios.post(
        `https://backend.propalchemy.io/product-service/v1/auth/sendRequest`,
        e
      );
      // await toast.remove(dismiss);
      toast.success("success");
      setPopupStreams("popstream", res.data.message);
      navigate('/agent/videostreaming')
      handleShow();
      resetFom();
    } catch (error) {
      console.log("app", error.response.data);
      setPopupStreams(error.response.data.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div>
        <Formik
          onSubmit={popUpstream}
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="container popupstreams mt-5">
              <div className="row">
                <div className="col-12">
                  <div className="row px-3">
                    <div className="col-6 popupforstrem px-5 py-2 mt-4">
                      <span className="lead fw-bold d-flex justify-content-center mt-4">
                        Request for joining?
                      </span>
                      <div className="form-group mt-3 px-3">
                        <label htmlFor="email">Email ID</label>
                        <br />
                        <Field
                          type="email"
                          palceholder="email"
                          className="pass w-100 form-control"
                          name="email"
                          required
                        />
                        <p className="text-danger">
                          <ErrorMessage name="email" />
                        </p>
                      </div>
                      <div className="d-flex justify-content-center p-3">
                        <Button
                          type="submit"
                          className="rounded-pill h-90 mx-2 w-50"
                          style={{ backgroundColor: "#A58B73" }}
                      
                        >
                          Request Sent!
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>

        <Modal
          show={loginshow}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title
              className="fw-bold fs-5"
              style={{ paddingLeft: "8rem" }}
            >
              Are you want to join the meeting?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <span>I want jo join the meeting!</span>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center border-0">
            <Button
              className="rounded-pill text-dark"
              style={{ backgroundColor: "#F1F0EF" }}
            >
              Deny
            </Button>
            <Button
              onClick={handleClose}
              className="rounded-pill"
              style={{ backgroundColor: "#A58B73" }}
              // onClick={()=>navigate('/agent/videostreaming')}
            >
              Allow
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
