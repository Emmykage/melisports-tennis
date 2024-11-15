import React from 'react'
import courtDirectories from '../../mock-server/court_directory.json';
import CourtCard from '../courtCard/CourtCard';
import { NavLink } from 'react-router-dom';

const SportDirectory = () => {
    console.log(courtDirectories)
  return (
    <div>
<div className='grid md:grid-cols-3 gap-4 my-4 p-8' >
        {courtDirectories?.length > 0 ? courtDirectories.slice(0, 3).map(directory => {
           
                return(
                    <CourtCard directory={directory}/>
                )
            
         
        }
       
  
        ) : <h2 className='text-2xl font-medium'>No Court Available</h2>}
            </div>

            <NavLink to={"/court-directory"} className={"text-center block w-max m-auto text-dark hover:text-primary"}> See More </NavLink>
    </div>
    

  )
}

export default SportDirectory