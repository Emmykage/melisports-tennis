import React from 'react'
// import {IoAnalyticsSharp} from "react-icons/io5"

const Income = () => {
  return (
   
        <div className="income">
          <span className="icon">
            {/* <IoAnalyticsSharp/> */}
            Stacke_line_chart
          </span>
          <div className="middle">
            <div className="left">
              <h3>Total income</h3>
              <h1>$25,000</h1>

            </div>
            <div className="progress">
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