import React, { useState } from 'react'
import { FaPhone, FaRegStar } from 'react-icons/fa'
import { IoBookmarkSharp } from 'react-icons/io5'
import { MdEmail, MdLocationPin } from 'react-icons/md'
import court from "../../assets/images/tennis-court.jpg"
import Hero from '../../components/banner/Hero'
import courtDirectories from "../../mock-server/court_directory.json"
import CourtCard from '../../components/courtCard/CourtCard'
import SelectInput from '../../components/selectInput/SelectInput'
import NavInfo from '../../components/nav/NavInfo'

const Directory = () => {
    const [location, setLocation] = useState("Abuja")

    const options = [
        {value: "Abuja", label: "Abuja"},
        {value: "Lagos", label: "Lagos"},
        {value: "Port-Harcourt", label: "Port-Harcourt"},
        {value: "Enugu", label: "Enugu"} 
    ]
    const handleLocation = (e) => {
        setLocation(e.target.value)
    }

    const directories = courtDirectories.filter(item => item.state === location)
    // const directories = courtDirectories.filter(item => item.state === location || item.region === region)

  return (

    <div className=''>
              <NavInfo />

        <Hero image={court} title="Court Directory" />


    <div className='max-w-7xl py-6 px-4 m-auto shadow rounded'>
        <div className='max-w-md w-full'>
      
        <SelectInput defaultValue={location} className={"w-full"} handleChange={handleLocation} label={"location"} options={options}/>

        </div>

    <div className='grid md:grid-cols-3 gap-4 my-4 p-8' >

        {directories.length > 0 ? directories.map(directory => (
            <CourtCard directory={directory} />
            ) 
        ) : <h2 className='text-2xl font-medium'>No Court Available</h2>
    }
            
            </div>


    </div>
    </div>

  )
}

export default Directory