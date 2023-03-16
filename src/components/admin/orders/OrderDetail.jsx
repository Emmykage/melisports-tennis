import React from 'react'

const OrderDetail = ({display}) => {
  return (
    <div className={display? 'order-detail' : 'order-detail show'  }>
        <h3 className='center'>
            Order number: 00000000101
        </h3>
        <table>
            <thead>
                <tr>
                    <th>

                    </th>
                    <th>name</th>
                    <th>cost</th>
                    <th>quantity</th>
                    <th>subtotal</th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    <td><img src='#' alt='product_image' /></td>
                    <td> Pure drive Lite</td>
                    <td>120000</td>
                    <td>2</td>
                    <td>240000</td>
                </tr>
                <tr>
                    <td><img src='#' alt='product_image' /></td>
                    <td> Pure drive Lite</td>
                    <td>120000</td>
                    <td>2</td>
                    <td>240000</td>
                </tr>
                <tr>

              <td>
              <img src='#' alt='product_image' />
              </td>
                <td>
                    evo drive
                            </td>
                <td>80000</td>
                <td>1</td>
                <td>8000</td>
                            </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    <td>
                        560000
                    </td>
                </tr>
            </tbody>
        </table>
        {/* <ul>
            <li>
                <div className='row'>
                    <div>
                        <img src='#' alt='product_image' />
                    </div>
                    <div className='full-100 flex-space'>
                        <span>
                            Pure drive Lite
                        </span>
                        <span>
                            cost
                        </span>
                        <span>
                            2
                        </span>
                        <span>
                           sub total
                        </span>


                    </div>
                </div>

            </li>
            <li>
                <div className='row'>
                    <div>
                        <img src='#' alt='product_image' />
                    </div>
                    <div className='full-100 flex-space'>
                        <span>
                            Pure drive Lite
                        </span>
                        <span>
                            cost
                        </span>
                        <span>
                            2
                        </span>
                        <span>
                           sub total
                        </span>


                    </div>
                </div>

            </li>
        </ul> */}
        
    </div>
  )
}

export default OrderDetail