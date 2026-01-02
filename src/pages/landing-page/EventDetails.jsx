import Hero from '../../components/banner/Hero';
import img from '../../assets/images/ngo/IMG-20250513-WA0021.jpg';
import Nav from '../../components/nav/Nav';
import Container from '../../components/container';

function EventDetails() {
  return (

    <>
      <Nav store={false} />
      <Container>

        <Hero image={img} title="Tennis Clinic for Secondary Schools" />

        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-3xl font-normal mb-4">A  Tennis Camp & Tournament 2025</h2>
          <p className="mb-2">
            📍
            <strong>Location:</strong>
            {' '}
            [Insert Venue Name, City]
          </p>
          <p className="mb-2">
            📅
            <strong>Date:</strong>
            {' '}
            August 5–10, 2025
          </p>
          <p className="mb-4">
            ⏰
            <strong>Time:</strong>
            {' '}
            9:00 AM – 4:00 PM daily
          </p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Daily training with certified coaches</li>
            <li>All tennis gear provided</li>
            <li>Games, drills, and activities</li>
            <li>Final tournament with medals</li>
          </ul>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">Register Your School</button>
        </section>
      </Container>

    </>
  );
}

export default EventDetails;
