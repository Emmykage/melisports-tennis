import React, { useState } from 'react'
import { PaystackButton } from 'react-paystack';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cart/cart';

const PaymentForm = ({amount= 10000}) => {
    const dispatch = useDispatch()
    const [billingDetails, setBillingDetails ] = useState({name: "", email: "", city: ""})
    // const publicKey = process.env.REACT_APP_PUBLIC_KEY;
    const  publicKey = "pk_test_9ff293bee5b397191f0d59ea6bab4ff2bc6e2374"

    console.log(publicKey, amount)

    const handleChange = (e) => {
        setBillingDetails({
          ...billingDetails,
          [e.target.name]: e.target.value,
          
        });
    }

    const componentProps = {
        email: billingDetails.email,
        amount: amount * 100,
        metadata: {
          name: billingDetails.name,
          phoneNumber: billingDetails.email,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () => {
            alert("Purchase successful")
            dispatch(clearCart())

        },
        onClose: () => alert("Are you sure")
      }
    
      const handleSUbmit = (e) => {
        e.preventDefault()
        console.log(billingDetails)

    
      }
  return (
    <form onSubmit={handleSUbmit}>
    <div>
    <div>
      <label htmlFor="">Name</label>
      {' '}
      <input required className='py-2 border w-full rounded' type="text" value={billingDetails.name} name="name" onChange={handleChange} />
    </div>

    <div>
      {' '}
      <label htmlFor="email">Email address</label>
      {' '}
      <input required type="email" className='py-2 border w-full rounded' value={billingDetails.email} name="email" onChange={handleChange} />
    </div>
    <div>
      {' '}
      <label htmlFor="email">Phone Number</label>
      {' '}
      <input required type="email" className='py-2 border w-full rounded' value={billingDetails.phoneNumber} name="email" onChange={handleChange} />
    </div>

    <div>
      <label htmlFor="country">city</label>
      <input required type="text" className='py-2 border w-full rounded' name="city" value={billingDetails.city} onChange={handleChange} />
    </div>

    <div className="flex gap-4">
      <div className="flex-1">
        <label htmlFor="">State</label>
        <input required type="text" className='py-2 border w-full rounded' name="state" value={billingDetails.state} onChange={handleChange} />
      </div>
      <div className="flex-1">
        <label htmlFor="">postal_code</label>
        <input className='py-2 border w-full rounded' type="text" name="postal_code" value={billingDetails.postal_code} onChange={handleChange} />
      </div>
    </div>

    <div>
        {/* <button type='submit' className='font-semibold  block my-3 text-center w-full py-3 border-2 border-dark'>Submit</button> */}
        <PaystackButton className='font-semibold  block my-3 text-center w-full py-3 border-2 border-dark' {...componentProps}/>
    </div>

  </div>
  </form>
  )
}

export default PaymentForm