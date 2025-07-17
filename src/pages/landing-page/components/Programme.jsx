import React from 'react'

const Programme = () => {
  return (
        <div className="max-w-5xl m-auto">

        <h2 className="text-3xl font-normal mb-4">Support Our Program</h2>
        <p className="mb-4 text-base font-normal">Help us empower kids through tennis. Your support makes it possible to offer free coaching, equipment, and mentorship.</p>
        <ul className="list-disc text-base list-inside space-y-1 mb-4">
          <li>Sponsor a Child</li>
          <li>Donate Equipment</li>
          <li>Make a Financial Donation</li>
          <li>Volunteer for Events</li>
        </ul>
        <div className="space-x-2">
          <button onClick={()=> navigate("/contact")} className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">Donate</button>
          <button onClick={()=> navigate("/contact")} className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition">Volunteer</button>
        </div>
        </div>
  )
}

export default Programme