import React, { useState } from 'react';

import court from '../../assets/images/tennis-court.jpg';
import Hero from '../../components/banner/Hero';
import courtDirectories from '../../mock-server/court_directory.json';
import CourtCard from '../../components/courtCard/CourtCard';
import SelectInput from '../../components/selectInput/SelectInput';
import NavInfo from '../../components/nav/NavInfo';
import { Button } from '@mui/material';
import AppModal from '../../components/modal/AppModal';
import ClickButton from '../../components/buttons/ClickButton';
import { useDispatch } from 'react-redux';
import { addCourts } from '../../redux/actions/review';
import { toast } from 'react-toastify';

const Directory = () => {
  const dispatch = useDispatch()
  const [location, setLocation] = useState('Abuja');
  const [isOpen, setIsOpen] = useState(false)
  const [formInput, setFormInput] = useState({
    city: "", 
    address: "",
    state: ""
  })
  const options = [
    { value: 'Abuja', label: 'Abuja' },
    { value: 'Lagos', label: 'Lagos' },
    { value: 'Port-Harcourt', label: 'Port-Harcourt' },
    { value: 'Enugu', label: 'Enugu' },
    { value: 'Anambra', label: 'Anambra' }, { value: 'Imo', label: 'Imo' },
  ];
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = () => {
    addCourts({court: formInput}).unWrap().then(result => {
      setIsOpen(false)
      toast(result?.message ?? "Suggestion recieved", {type: "success"})
    }).catch(error => {
        toast(error?.message ?? "Suggestion recieved", {type: "error"})

    })

  }

  const directories = courtDirectories.filter((item) => item.state === location);
  // const directories = courtDirectories.filter(item => item.state === location || item.region === region)

  return (
<>
    <div className="">
      <NavInfo />
      <Hero image={court} title="Court Directory" />

      <div className="max-w-7xl py-6 px-4 m-auto shadow rounded ">
        <div className="w-full flex justify-between w-f">

          <div className='flex-1 max-w-md bg-red-'>
             <SelectInput defaultValue={location} className="w-full" handleChange={handleLocation} label="location" options={options} />


          </div>

          <div className='flex-'>
            <p className='text-primary font-semibold text-base'>Help Us Improve Our Court</p>
            <button onClick={() => setIsOpen(true)} className='bg-gray-300 py-2 px-4 rounded '>Add To This List Around You</button>
            
          </div>


        </div>

        <div className="grid md:grid-cols-3 gap-4 my-4 p-8">

          {directories.length > 0 ? directories.map((directory) => (
            <CourtCard directory={directory} />
          )) : <h2 className="text-2xl font-medium">No Court Available</h2>}

        </div>

      </div>
    </div>
    <AppModal open={isOpen} onClose={() => setIsOpen(prev => !prev)}  onCancel={() => setIsOpen(prev => !prev)}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city"> City</label>
          <input type="text" id='city' name='city' value={formInput.city}  onChange={(e) => setFormInput({city: e.target.value})} />
        </div>
         <div>
          <label htmlFor="address"> Address</label>
          <input type="text" id='address' name='address' value={formInput.address}  onChange={(e) => setFormInput({address: e.target.value})} />
        </div>
          <div>
          <label htmlFor="state"> State</label>
          <select
          value={formInput.state}
           onChange={(e) => setFormInput({state: e.target.value})} 
           >
            {options.map(option => (
            <option value={option.value}>{option.label}</option>

            ))}

            </select>

        </div>
        <ClickButton className={"mt-4"} type={"submit"}>Submit</ClickButton>
      </form>
    </AppModal>
    </>

  );
};

export default Directory;
