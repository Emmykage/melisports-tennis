import React from 'react'
import {AiOutlineLineChart} from "react-icons/ai"

const Income = () => {
  return (
   
        <div className="income">
          <span className="icon">
            <AiOutlineLineChart className='icon-chart'/>
            
          </span>
          <div className="middle">
            <div className="left">
              <h3>Total income</h3>
              <h1>$25,000</h1>

            </div>
            <div className="progresser ad">
              <svg>
                <circle cx='38' cy='38' r='36'></circle>
              </svg>
              <div className="number">
                <p>81%</p>
              </div>
            </div>
            
          </div>
          <small className="text-muted">
            Last 24 hours
          </small>
        </div>
     
  )
}

export default Income