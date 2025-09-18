import React from 'react';

const EnrollChildForm = () => (
  <div className="max-w-5xl m-auto py-5 bg-gray-50 md:px-4 rounded-lg">
    <h2 className="text-3xl font-normal mb-4 ">Enroll Your School</h2>
    <form action="https://formspree.io/f/mgvylgrp" method="post" className="space-y-4">
      <div>
        <label className="block font-semibold"> Name  Of School</label>
        <input className="w-full border p-2 rounded-xl" name="school_name" type="text" placeholder="School Name" />
      </div>
      <div>
        <label className="block font-semibold">Contact Phone Number</label>
        <input className="w-full border p-2 rounded-xl" type="text" name="phone_number" placeholder="Phone Number" />
      </div>
      <div>
        <label className="block font-semibold">Email</label>
        <input className="w-full border p-2 rounded-xl" type="email" name="email" placeholder="Email Address" />
      </div>
      <div>
        <label className="block font-semibold">Location</label>
        <input className="w-full border p-2 rounded-xl" name="location" type="text" placeholder="School's Location" />
      </div>
      <div>
        <label className="block font-semibold">Address</label>
        <input className="w-full border p-2 rounded-xl" name="address" type="text" />
      </div>

      <div>
        <label className="inline-flex items-center">
          {/* <input type="checkbox" className="mr-2" /> */}
          I consent to my school's participation in the program.
        </label>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
        Submit Enrollment
      </button>
    </form>
  </div>
);

export default EnrollChildForm;
