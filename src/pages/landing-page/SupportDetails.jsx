import Hero from '../../components/banner/Hero';
import img from '../../assets/images/ngo/IMG-20250513-WA0021.jpg';
import EnrollChildForm from './components/EnrollChild';
import Nav from '../../components/nav/Nav';

function EnrollChildPage() {
  return (
    <>

      <Nav store={false} />
      <Hero image={img} title="Tennis Clinic for Secondary Schools" />
      <EnrollChildForm />
    </>
  );
}

export default EnrollChildPage;
