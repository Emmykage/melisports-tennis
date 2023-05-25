import React from 'react'
import {CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
// import StatusMessages from './StatusMessages'
import axios from 'axios'
import { useState } from 'react'
import baseURL from '../redux/baseURL'
import PaymentField from '../components/PaymentForm'

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4foff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {color: "#fce883"}, "::placeholder": { color: "#87bbfd"}
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
}

const PaymentForm = ({total_cost}) => {
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: "",
    address: {
      city: "",
      postal: "",
      state: ""
    }
  })
  const stripe = useStripe()
  const elements = useElements()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements){
      return
    }
    

  const {clientSecrete} = await axios.post(`/payment_intent`, {
            amount: total_cost * 100,
  } )
  
}
console.log(billingDetails)

  return (
    <>
    {/* {!success?  */}
    <form 
    onSubmit={handleSubmit} 
    className='stripe'>
      <fieldset className='FormGroup'>
        <PaymentField billingDetails={billingDetails} setBillingDetails={setBillingDetails}/>
        <div className="FormRow m-h2">
          <CardElement options={CARD_OPTIONS}/>

        </div>
      </fieldset>
      <small>
              By clicking the button, you agree to the
              {' '}
              <a href="#">Terms and Conditions</a>
            </small>
      <button>Pay</button>

    </form> :
    <div>
      <h2> You just bought something congrats</h2>
    </div>
{/* } */}
    
    </>  )
}

export default PaymentForm

















// console.log(clientSecrete)

  //  const {paymentIntent} = await stripe.confirmCardPayment(
  //   clientSecrete, {
  //     payment_method: {
  //       card: elements.getElement(CardElement)
  //     }
  //   }
  //  )
    
//     const {error, paymentMethod} = await stripe.createPaymentMethod
//     ({
//       type: "card",
//       card: elements.getElement(CardElement)
//     })

//   if(!error){
//     try {
//       const {id} = paymentMethod
//       const response = await axios.post(`${baseURL}`, {
//         amount: total_cost,
//         id

//       } )
      
//       if(response.data.success){
//         console.log("Successful payment")
//         setSuccess(true)
//       }
      
//     } catch (error) {
//       console.log("Error", error)
//     }
//   }else{
//     console.log(error.message)
//   }
//   console.log(total_cost)