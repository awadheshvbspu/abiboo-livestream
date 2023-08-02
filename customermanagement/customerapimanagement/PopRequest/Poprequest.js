import React from 'react'
import '../PopRequest/poprequest.css';

export default function PopRequest() {
  return (
    <>
        <div className='container Sent'>
            <div className='row requestsent'>
                <div className='col-md-12 col-sm-12 '>
                <div className='request'>
                    <h5 className='fw-bold'> Request Sent!</h5>
                </div>
                <div className='pt-3'>
                    <h5>Your Request to Reset API Key has been Sent!</h5>
                    <p>Use this request to reset key in your application</p>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}
