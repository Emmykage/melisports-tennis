import { useState } from 'react';
import DiscoverBtn from '../../../components/buttons/DiscoverBtn';
import InfoModal from '../../../components/modal/InfoModal';

function EventDetails() {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {

  };
  return (
    <>

      <section className="bg-white pt-10 text-base">

        <h2 className="text-3xl font-normal mb-4">A Child Can Serves 2025</h2>
        <p className="mb-2">
          📍
          <strong>Location:</strong>
          {' '}
          Nigeria
        </p>
        <p className="mb-2">
          📅
          <strong>Date:</strong>
          {' '}
          2025
        </p>
        <p className="mb-4">
          ⏰
          <strong>Time:</strong>
          {' '}
          9:00 AM – 4:00 PM daily
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>Access to Tennis Coaches</li>
          <li>Access to Tennis Courts</li>
          <li>Available Tennis Gears</li>
          <li>Regular Tennis Trainings</li>
          <li>Tennis Clinic Participations</li>
        </ul>
        <DiscoverBtn className="bg-blue-600 mt-10 px-4 py-2 rounded-xl hover:bg-blue-700 transition" btnText="Register Your School" />
      </section>
      <InfoModal open={open} handleClose={() => setOpen(false)}>

        <div>
          <form action="">
            <div>
              <label htmlFor="name" />
            </div>
          </form>
        </div>

      </InfoModal>
    </>
  );
}

export default EventDetails;
