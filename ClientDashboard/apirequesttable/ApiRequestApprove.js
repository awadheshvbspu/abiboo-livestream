import React,{useState} from 'react'

export default function ApiRequestApprove() {
    const [apiRequest,setApiRequest] = useState("Approve for API");

  const handleDiscard = () =>{
        setApiRequest("");
  }
   
  const handleApprove = (event) =>{
    console.log(apiRequest,event);
  }
  return (
    <>
        <div className="container">
        <div className="row">
          <div className="apirequest">
            <div className="col-md-12 api_request">
              <span className="fw-bold lead">Are you sure?</span>
              <p>This will allow client to reset the api key</p>
            </div>
            <div className="apirequest_button">
              <button type="button" className="discard" onClick={handleDiscard}>Discard</button>
              <button type="button" className="approve" onClick={handleApprove}>
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
