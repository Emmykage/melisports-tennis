import React from 'react';
import { NavLink } from 'react-router-dom';
import courtDirectories from '../../mock-server/court_directory.json';
import CourtCard from '../courtCard/CourtCard';

const SportDirectory = () => (
  <div>
    <div className="grid md:grid-cols-3 max-w-7xl m-auto gap-4 my-4 p-8">
      {courtDirectories?.length > 0 ? courtDirectories.slice(0, 3).map((directory) => (
        <CourtCard directory={directory} />
      )) : <h2 className="text-2xl font-medium">No Court Available</h2>}
    </div>

    <NavLink to="/court-directory" className="text-center block w-max m-auto text-dark hover:text-primary"> See More </NavLink>
  </div>

);

export default SportDirectory;
