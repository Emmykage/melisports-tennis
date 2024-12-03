import React, { useState } from 'react'
import Button from '../buttons/Button'

const DeliveryForm = ({feeInput, setFeeInput, handleFeeSubmit, loading}) => {

  return (
    <div className='w-full p-4 border rounded-lg -red-500'>
        <form onSubmit={handleFeeSubmit}>
            <div className='my-3'>
                <label htmlFor="State">State</label>

                <input type="text" placeholder='State' value={feeInput.state} onChange={(e) => setFeeInput({...feeInput, state: e.target.value})} />
            </div>
            <div className='my-3'>
                <label htmlFor="City">City</label>

                <input type="text" placeholder='State'  value={feeInput.city} onChange={(e) => setFeeInput({...feeInput, city: e.target.value})} />
            </div>
            <div className='my-3'>
                <label htmlFor="fee">Delivery</label>

                <input type="number" placeholder='State'  value={feeInput.delivery_fee} onChange={(e) => setFeeInput({...feeInput, delivery_fee: e.target.value})} />
            </div>

            <Button  type="submit">Add Delivery  Fee</Button>
        </form>
    </div>
  )
}

export default DeliveryForm