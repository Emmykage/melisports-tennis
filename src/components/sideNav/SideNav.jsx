import React from 'react';
import './sidenav.css';

const SideNav = ({ children }) => (
  <>
    <div className="w-64 relative hidden sm:block rounded-2xl space-y-6">
      <div className="sticky rounded-lg border-gray-300 shadow-md bg-white p-4 py-6 top-20 left-0">
        {children}
      </div>
    </div>

  </>
);

export default SideNav;