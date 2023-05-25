import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import "../styles/stripe.css"
import PaymentForm from './PaymentForm'
const PUBLIC_KEY = "pk_test_51NA8CuHxI0r7Hp29cd8zGHLOk7dN3zlWiGdYylXsfyEmFOrn0lbxgDzJM4A1A08x5dTPOEiHRRAADpjOzZzSy0My00cFZsfX7s"

const stripeTestPromise = loadStripe(PUBLIC_KEY)
const StripeContainer = ({total_cost}) => {
  // const options = {
  //   clientSecrete: "{{CLIENT_SECRETE}}"
  // }
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm total_cost={total_cost}/>
    </Elements>
  )
}

export default StripeContainer