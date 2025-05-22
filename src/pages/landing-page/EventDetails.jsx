import Hero from "../../components/banner/Hero";
import NavInfo from "../../components/nav/NavInfo";
import img from "../../assets/images/ngo/IMG-20250513-WA0021.jpg"

function EventDetails() {
    return (

        <>
          <NavInfo />
            <Hero image={img} title="Summer Tennis Camp" />

            <section className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-3xl font-normal mb-4">Summer Tennis Camp & Tournament 2025</h2>
                <p className="mb-2">📍 <strong>Location:</strong> [Insert Venue Name, City]</p>
                <p className="mb-2">📅 <strong>Date:</strong> August 5–10, 2025</p>
                <p className="mb-4">⏰ <strong>Time:</strong> 9:00 AM – 4:00 PM daily</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Daily training with certified coaches</li>
                <li>All tennis gear provided</li>
                <li>Games, drills, and activities</li>
                <li>Final tournament with medals</li>
                </ul>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">Register for Camp</button>
            </section>
      
</>
    );
  }

  export default EventDetails