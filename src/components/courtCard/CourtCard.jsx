import React from 'react';
import { FaPhone, FaRegStar } from 'react-icons/fa';
import { IoBookmarkSharp } from 'react-icons/io5';
import { MdEmail, MdLocationPin } from 'react-icons/md';

const CourtCard = ({ directory }) => {
  const {
    courtName, location, state, phone_number, stars, email,
  } = directory;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 max-w-md">
      {/* Court Name */}
      <h3 className="text-xl font-normal tracking-wide text-gray-800">
        {courtName}
      </h3>

      {/* Location */}
      <div className="flex gap-2 my-4 items-start text-gray-600">
        <MdLocationPin className="text-red-500 text-xl shrink-0" />
        <p className="leading-snug">{location}</p>
      </div>

      {/* State */}
      <div className="flex gap-2 my-3 items-center text-gray-700">
        <IoBookmarkSharp className="text-primary text-lg" />
        <span className="capitalize">{state}</span>
      </div>

      {/* Stars */}
      <div className="flex gap-1 text-yellow-400 text-lg my-4 pl-1">
        {Array.from({ length: stars }).map((_, i) => (
          <FaRegStar key={i} />
        ))}
      </div>

      {/* Phone */}
      <div className="flex gap-2 items-center text-gray-700">
        <FaPhone className="text-green-500" />
        <span className="font-medium">{phone_number}</span>
      </div>

      {/* Email (if available) */}
      {email && (
      <div className="flex items-center gap-2 my-3 text-gray-700">
        <MdEmail className="text-blue-500" />
        <span>{email}</span>
      </div>
      )}
    </div>

  );
};

export default CourtCard;
