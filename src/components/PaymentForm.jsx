import React from 'react'
import { useState } from 'react'


const PaymentField = ({billingDetails, setBillingDetails}) => {
  
      const handleChange = (e) => {
        setBillingDetails({
          ...billingDetails,
          [e.target.name]: e.target.value,
          address: {
            ...billingDetails.address,
            [e.target.name]: e.target.value
          }
          
      
        })
      }
  return (
    <div>
        <div>
            <label htmlFor="">Name</label>
            {' '}
            <input type="text" value={billingDetails.name} name="name" onChange={handleChange} />
          </div>
          
          <div>
            {' '}
            <label htmlFor="email">Email address</label>
            {' '}
            <input type="email" value={billingDetails.email} name="email" onChange={handleChange}/>
          </div>

          <div>
            <label htmlFor="country">city</label>
            <input type="text" name="city" value={billingDetails.address.city} onChange={handleChange}/>
          </div>

          <div className="flex gap-1">
            <div className="flex-3">
              <label htmlFor="">State</label>
              <input type="text" name='state' value={billingDetails.address.state} onChange={handleChange}/>
            </div>
            <div className="flex-2">
              <label htmlFor="">postal</label>
              <input type="text" name='postal' value={billingDetails.address.postal} onChange={handleChange} />
            </div>
          </div>
       
            <div>
            
            {/* <input type="submit" value="place order" onClick={handlePurchase} /> */}
          </div>
          
        
    </div>
  )
}

export default PaymentField