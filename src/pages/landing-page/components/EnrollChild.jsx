import React from 'react'

const EnrollChildForm = () => {
  return (
        <div className="max-w-5xl m-auto py-5 bg-gray-50 md:px-4 rounded-lg"> 
            <h2 className="text-3xl font-normal mb-4 ">Enroll a Child</h2>
            <form className="space-y-4">
            <div>
                <label className="block font-semibold">Parent/Guardian Name</label>
                <input className="w-full border p-2 rounded-xl" type="text" placeholder="Full Name" />
            </div>
            <div>
                <label className="block font-semibold">Phone Number</label>
                <input className="w-full border p-2 rounded-xl" type="text" placeholder="Phone Number" />
            </div>
            <div>
                <label className="block font-semibold">Email</label>
                <input className="w-full border p-2 rounded-xl" type="email" placeholder="Email Address" />
            </div>
            <div>
                <label className="block font-semibold">Child's Name</label>
                <input className="w-full border p-2 rounded-xl" type="text" placeholder="Child's Full Name" />
            </div>
            <div>
                <label className="block font-semibold">Age</label>
                <input className="w-full border p-2 rounded-xl" type="number" min="6" max="16" />
            </div>
            <div>
                <label className="block font-semibold">Gender</label>
                <select className="w-full border p-2 rounded-xl">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label className="block font-semibold">School Name</label>
                <input className="w-full border p-2 rounded-xl" type="text" placeholder="School Name" />
            </div>
            <div>
                <label className="inline-flex items-center">
                {/* <input type="checkbox" className="mr-2" /> */}
                I consent to my child's participation in the program.
                </label>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                Submit Enrollment
            </button>
            </form>        
        </div>
  )
}

export default EnrollChildForm