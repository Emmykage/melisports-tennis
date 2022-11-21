import React from 'react'
import './sidenav.css'

const SideNav = () => {
  return (
    <>
        <div className='side-row'>
           <h6>Activities</h6>

            <input type="checkbox" id='tennis'/><label for="activity" style={{fontSize:"1rem"}}>Tennis</label>
        </div>
        <div className='side-row'>
            <h6>Racquet Type</h6>
            <input type="checkbox" id='activity'/>
            <label for="activity" style={{fontSize:"1rem"}}>Activity</label>
        </div>
        <div className='side-row'>
            <h6>Intermediate</h6>
            <input type="checkbox" id='activity'/>
            <label for="activity" style={{fontSize:"1rem"}}>Activity</label>
        </div>
        <div className='side-row'>
            <h6>Brand</h6>
            <input type="checkbox" id='babolat'/>
            <label for="activity" style={{fontSize:"1rem"}}>babolat</label>
        </div>

    </>
  )
}

export default SideNav