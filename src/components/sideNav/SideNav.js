import React from 'react';
import './sidenav.css';

const SideNav = () => (
  <>
    <div className="side-row">
      <h6>Activities</h6>

      <label htmlFor="activity" style={{ fontSize: '1rem' }}>
        Tennis
        <input type="checkbox" id="tennis" />
      </label>
    </div>
    <div className="side-row">
      <h6>Racquet Type</h6>

      <label htmlFor="activity" style={{ fontSize: '1rem' }}>
        Activity
        <input type="checkbox" id="activity" />
      </label>
    </div>
    <div className="side-row">
      <h6>Intermediate</h6>

      <label htmlFor="activity" style={{ fontSize: '1rem' }}>
        Activity
        <input type="checkbox" id="activity" />
      </label>
    </div>
    <div className="side-row">
      <h6>Brand</h6>

      <label htmlFor="activity" style={{ fontSize: '1rem' }}>
        babolat
        <input type="checkbox" id="babolat" />
      </label>
    </div>

  </>
);

export default SideNav;
