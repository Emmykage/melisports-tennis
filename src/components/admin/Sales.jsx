import React from 'react'

const Sales = () => {
  return (
    // <div>Sales</div>
    <div className="sales">
          <span className="icon">
            {/* <IoAnalyticsSharp/> */}
          </span>
          <div className="middle">
            <div className="left">
              <h3>Total sales</h3>
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

export default Sales