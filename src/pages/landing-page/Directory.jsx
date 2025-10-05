import React, { useState } from 'react';

import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import court from '../../assets/images/tennis-court.jpg';
import Hero from '../../components/banner/Hero';
import courtDirectories from '../../mock-server/court_directory.json';
import CourtCard from '../../components/courtCard/CourtCard';
import SelectInput from '../../components/selectInput/SelectInput';
import NavInfo from '../../components/nav/NavInfo';
import AppModal from '../../components/modal/AppModal';
import ClickButton from '../../components/buttons/ClickButton';
import { addCourts } from '../../redux/actions/review';
import Nav from '../../components/nav/Nav';

const Directory = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('Abuja');
  const [isOpen, setIsOpen] = useState(false);
  const [formInput, setFormInput] = useState({
    city: '',
    address: '',
    state: '',
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formInput.city || !formInput.address || !formInput.state) {
      toast('Please fill all fields', { type: 'error' });
      return;
    }
    addCourts({ court: formInput }).unWrap().then((result) => {
      setIsOpen(false);
      toast(result?.message ?? 'Suggestion recieved', { type: 'success' });
    }).catch((error) => {
      toast(error?.message ?? 'Suggestion recieved', { type: 'error' });
    });
  };

  const directories = courtDirectories.filter((item) => item.state === location);
  // const directories = courtDirectories.filter(item => item.state === location || item.region === region)

  return (
    <>
      <div className="bg-white">
        <Nav store={false} />
        <Hero image={court} title="Court Directory" />

        <div className="max-w-7xl py-6 px-4 m-auto shadow rounded ">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm">
            {/* Location Select */}
            <div className="flex-1 max-w-md w-full">
              <SelectInput
                defaultValue={location}
                className="w-full"
                handleChange={handleLocation}
                label="Location"
                options={options}
              />
            </div>

            {/* Call-to-action */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <p className="text-primary font-medium text-base text-center md:text-left">
                Help Us Improve Our Court
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-primary text-white font-medium py-2 px-5 rounded-lg shadow hover:bg-primary/90 transition-all"
              >
                Add To This List
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 my-4 p-8">

            {directories.length > 0 ? directories.map((directory) => (
              <CourtCard directory={directory} />
            )) : <h2 className="text-2xl font-medium">No Court Available</h2>}

          </div>

        </div>
      </div>
      <AppModal open={isOpen} onClose={() => setIsOpen((prev) => !prev)} onCancel={() => setIsOpen((prev) => !prev)}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="city"> City</label>
            <input type="text" id="city" name="city" value={formInput.city} onChange={(e) => setFormInput({ city: e.target.value })} />
          </div>
          <div>
            <label htmlFor="address"> Address</label>
            <input type="text" id="address" name="address" value={formInput.address} onChange={(e) => setFormInput({ address: e.target.value })} />
          </div>
          <div>
            <label htmlFor="state"> State</label>
            <select
              value={formInput.state}
              onChange={(e) => setFormInput({ state: e.target.value })}
            >
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>

              ))}

            </select>

          </div>
          <ClickButton className="mt-4" type="submit">Submit</ClickButton>
        </form>
      </AppModal>
    </>
  // fgf

  );
};

export default Directory;
