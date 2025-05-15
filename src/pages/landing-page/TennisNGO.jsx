import Hero from "../../components/banner/Hero";
import NavInfo from "../../components/nav/NavInfo";
import img from "../../assets/images/ngo/IMG-20250513-WA0028.jpg"
import { useNavigate } from "react-router-dom";
function SupportProgram() {
    const navigate = useNavigate()
    return (
        <>
         <NavInfo />
            <Hero image={img} title="Summer Tennis Camp" />

      <section className=" px-4 py-20 6 rounded-2xl shadow">
        <div className="max-w-5xl m-auto">

        <h2 className="text-2xl font-bold mb-4">Support Our Program</h2>
        <p className="mb-4">Help us empower kids through tennis. Your support makes it possible to offer free coaching, equipment, and mentorship.</p>
        <ul className="list-disc list-inside space-y-1 mb-4">
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

      </section>
      </>
    );
  }


  export default SupportProgram