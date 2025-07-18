import React from 'react';
import { FaPhone, FaRegStar } from 'react-icons/fa';
import { IoBookmarkSharp } from 'react-icons/io5';
import { MdEmail, MdLocationPin } from 'react-icons/md';

const CourtCard = ({ directory }) => {
  const {
    courtName, location, state, phone_number, stars, email,
  } = directory;

  return (
    <div className="p-5 shadow-2xl hover:shadow-none transition-all duration-200 ease-linear border rounded">
      <h3 className="text-lg font-medium tracking-wider">{courtName}</h3>
      <div className="flex gap-3 my-3 items-start">
        <MdLocationPin className="shrink-0" />
        <p>{location}</p>
      </div>
      <div className="flex gap-3 my-3 items-center">
        <IoBookmarkSharp />

        {state}
      </div>

      <div className="flex gap-3 text-xl my-3 pl-5">
        {Array.from({ length: stars }).map((_) => (
          <FaRegStar />

        ))}

      </div>
      <div className="flex gap-3 items-center">
        <FaPhone />

        {phone_number}
        {/* <span>Email</span> */}
      </div>

      {email
                     && (
                     <div className="flex items-center gap-3 my-3">
                       <MdEmail />
                       {' '}
                       {email}
                     </div>
                     ) }

    </div>
  );
};

export default CourtCard;
