import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdReportGmailerrorred } from 'react-icons/md';

const ErrorMessage = ({ error, loading, message }) => (
  <div>
    {!message && !error ? (
      <p className="normal">
        {' '}
        {/* {"loading..."} */}
      </p>
    ) : (!error ? (
      <p className="text-green bg-green-200 rounded my-3 p-5 flex gap-3 items-center">
        {' '}

        <FaCheckCircle className="text-green-700 text-3xl" />
        {message}
      </p>
    ) : (
      <p className="text-red-800 bg-red-200 rounded my-3 p-5 flex gap-3 items-center">
        {' '}

        <MdReportGmailerrorred className="text-red-700 text-3xl" />
        {message}
      </p>
    )) }
  </div>
);

export default ErrorMessage;
