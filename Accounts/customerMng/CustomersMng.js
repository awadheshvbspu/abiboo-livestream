import React from 'react'
import './customermng.css';

export default function CustomersMng() {
  return (
    <>
        <div className='container CustomerAccount'>
            <div className='row '>
                <div className='col-12'>
                <div className=''>
                <div className='create pt-3'>
                    <h4>Create Customer</h4>
                    <p>Create an account for the customer!</p>
                </div>
                <div className=''>
                <label>Company Name</label> <br/>
                    <input type='text' className='Company'/>
                </div>
                </div>
                <div className='row pt-3'>
                    <div className='col-6'>
                    <label>Username</label> <br/>
                    <input type='text' className='User'/>
                    </div>
                </div>
                <div className='row p-5'>
                    <div className='buttonCustomer'>
                    <button type='button'>Cancel</button>
                    <button type='button'>Save</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
