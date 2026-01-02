import { useNavigate } from 'react-router-dom';
import Hero from '../../components/banner/Hero';
import img from '../../assets/images/ngo/IMG-20250513-WA0028.jpg';
import EnrollChildForm from './components/EnrollChild';
import Programme from './components/Programme';
import EventDetails from './components/EventDetails';
import imgCamp from '../../assets/images/ngo/camp-img.jpg';
import imgCamp1 from '../../assets/images/ngo/camp-img-1.jpg';
import imgCamp2 from '../../assets/images/ngo/6381334.jpg';
import Nav from '../../components/nav/Nav';
import Container from '../../components/container';

function SupportProgram() {
  const navigate = useNavigate();
  return (
    <>
      <Nav store={false} />
      <Container>

        <Hero image={img} title="Tennis Clinic for Secondary Schools" />
        <section className="py-20 px-4 mt-20 text-center">
          <div className="max-w-7xl m-auto font-semibold ">
            <p>
              SCSF believe in the power of sport to transform lives, we are on a mission to use sport as a tool for positive change among young children in Africa, through providing opportunities that is inclusive, provide mentorship, and create safe spaces where children and young people can build personal growth, confidence, skills, and lasting connections.
              Support a Child in Sport Charity is a founded to support school children and  teenagers enjoy sport like tennis in their schools.
              Our vision is to become the leading sport charity in Nigeria, empowering thousands of young people through racquet sports and education while inspiring the young generation of leaders and champions.
            </p>
          </div>
        </section>
        <section className="md:py-20 px-4 bg-white">

          <div className="grid gap-4 max-w-7xl m-auto md:grid-cols-2 items-center mt-10">
            <div>
              <EventDetails />
            </div>
            <div className="">
              <img src={imgCamp} alt="" className="h-full rounded-lg" />

            </div>

          </div>

        </section>

        <section id="support" className="md:py-10 px-4 bg- bg-[#fef9f5]">

          <div className="grid  gap-4 max-w-7xl m-auto md:grid-cols-2 items-center mt-10">

            <div className="p-4 h-96">
              <img src={imgCamp2} alt="" className="h-full rounded-lg" />

            </div>
            <div>
              <Programme />
            </div>

          </div>

        </section>

        <section id="enroll" className="md:py-20 px-4 bg-gray-50">

          <div className="grid gap-4 max-w-7xl m-auto md:grid-cols-2 items-center mt-10">
            <div>
              <EnrollChildForm />
            </div>
            <div className=" h-full">
              <img src={imgCamp1} alt="" className="h-full rounded-xl grayscale-0" />

            </div>
          </div>
        </section>
      </Container>

    </>
  );
}

export default SupportProgram;
