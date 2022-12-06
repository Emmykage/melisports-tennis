import React from 'react';
import './sidenav.css';

const SideNav = () => (
  <>
    <div className="side-row">
      <h6>Activities</h6>

     </div> 
      <div className="side-row">
        <label htmlFor="tennis" style={{ fontSize: '1rem' }}>
          
          <input type="checkbox" id="tennis" />
          Tennis
        </label>
        <label htmlFor="tennis" style={{ fontSize: '1rem' }}>
          
          <input type="checkbox" id="tennis" />
          Badminton
        </label>
      </div>
      <div className="side-row">
        <h6>Racquet Type</h6>
        <label htmlFor="control" style={{ fontSize: '1rem' }}>
       
        <input type="checkbox" id="control" />
        control
        </label>
        <label htmlFor="power-beginner" style={{ fontSize: '1rem' }}>
        
        <input type="checkbox" id="power-beginner" />
        power Beginner
        </label>
        <label htmlFor="junior" style={{ fontSize: '1rem' }}>
       
        <input type="checkbox" id="junior" />
        junior
        </label>
      </div>
      <div className="side-row">
        <h6>Skill level</h6>
        <label htmlFor="beginner" style={{ fontSize: '1rem' }}>
     
        <input type="checkbox" id="activity" />
        Beginner
        </label>
        <label htmlFor="intermediate" style={{ fontSize: '1rem' }}>
        
        <input type="checkbox" id="intermediate" />
        Intermediate
      </label>
      <label htmlFor="advanced" style={{ fontSize: '1rem' }}>
     
        <input type="checkbox" id="activity" />
        Advanced
      </label>
    </div>
    <div className="side-row">
      <h6>Brand</h6>

      <label htmlFor="activity" style={{ fontSize: '1rem' }}>
   
        <input type="checkbox" id="babolat" />
        babolat
      </label>
    </div>
    

  </>
);

export default SideNav;
