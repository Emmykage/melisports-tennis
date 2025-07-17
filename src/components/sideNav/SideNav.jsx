import React from 'react';
import './sidenav.css';

const SideNav = ({children}) => (
  <>
       <div className="side-nav shrink-0 relative">
            <div className='sticky border rounded-lg border-gray-300 shadow bg-white  top-4 left-0'>
              {children}
              </div>

              </div>
              

  </>
);

export default SideNav;
