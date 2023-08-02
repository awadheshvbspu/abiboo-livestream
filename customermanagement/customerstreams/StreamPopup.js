import React from 'react'

export default function() {
  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='offset-md-3'>
                <div className='stream_request'>
                    <p className='lead'> Request for Joining</p>
                    </div>
                    <div className='joining_request'>
                        <h5>Cameron Williamson wants to join the meeting</h5>
                        <p>Allow the user to view the stream</p>
                    </div>
                    <div>
                        <button type='submit' className='btn btn-sucess'>Deny</button>
                        <button type='submit' className='btn btn-secondary'>Allow</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
