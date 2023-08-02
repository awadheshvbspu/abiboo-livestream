import React from "react";
import "./createapikey.css";

export default function ApiRequest() {
  
  return (
    <>
      <div className="container createapikey">
        <div className="row">
          <div className="apicreate">
            <div className="col-md-12 api_create">
              <span className="fw-bold lead">Create API Key</span>
              <p>Use this key in your application</p>
            </div>
            <div className="row p-5">
                <label className="mb-2">Enter API Key</label> <br />
                <input type="pass" className="createapi" placeholder="*******************" />
              </div>
            <div className="apicreate_button">
              <button type="button" className="cancelapi">Cancel</button>
              <button type="button" className="setapi">
                Set API Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
