import React from 'react'

const RecentOrders = () => {
  return (
    <div className='recent-orders'>
       
        <h2>Recent orders</h2>
        <table>
          <thead>
            <tr>
              <th>Product name</th>
              <th>Product number</th>
              <th>Payment</th>
              <th>Status name</th>

            </tr>

          </thead>
          <tbody>
            <tr>
              <td>Babolat oure drive</td>
              <td>34</td>
              <td>due</td>
              <td className='warning'>Pending</td>
              <td className='primary'>Details</td>


            </tr>
            <tr>
              <td>Babolat oure drive</td>
              <td>34</td>
              <td>due</td>
              <td className='warning'>Pending</td>
              <td className='primary'>Details</td>


            </tr>
            <tr>
              <td>Babolat oure drive</td>
              <td>34</td>
              <td>due</td>
              <td className='warning'>Pending</td>
              <td className='primary'>Details</td>


            </tr>
            <tr>
              <td>Babolat oure drive</td>
              <td>34</td>
              <td>due</td>
              <td className='warning'>Pending</td>
              <td className='primary'>Details</td>


            </tr>
            <tr>
              <td>Babolat oure drive</td>
              <td>34</td>
              <td>due</td>
              <td className='warning'>Pending</td>
              <td className='primary'>Details</td>


            </tr>
          </tbody>
        </table>
        <a href='#'>Show all</a>
     
    </div>
  )
}

export default RecentOrders