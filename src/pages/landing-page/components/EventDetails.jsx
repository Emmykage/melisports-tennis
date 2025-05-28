import DiscoverBtn from "../../../components/buttons/DiscoverBtn";

function EventDetails() {
    return (    
            <section className="bg-white pt-10 text-base">
                <h2 className="text-3xl font-normal mb-4">Summer Tennis Camp & Tournament 2025</h2>
                <p className="mb-2">📍 <strong>Location:</strong> Enugu</p>
                <p className="mb-2">📅 <strong>Date:</strong> August 5–10, 2025</p>
                <p className="mb-4">⏰ <strong>Time:</strong> 9:00 AM – 4:00 PM daily</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Daily training with certified coaches</li>
                <li>All tennis gear provided</li>
                <li>Games, drills, and activities</li>
                <li>Final tournament with medals</li>
                </ul>
                <DiscoverBtn className="bg-blue-600 mt-10 px-4 py-2 rounded-xl hover:bg-blue-700 transition" btnText="Register for Camp"/>
            </section>
      
    );
  }

  export default EventDetails