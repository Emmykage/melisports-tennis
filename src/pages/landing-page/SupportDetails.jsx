import Hero from '../../components/banner/Hero';
import img from '../../assets/images/ngo/IMG-20250513-WA0021.jpg';
import EnrollChildForm from './components/EnrollChild';
import Nav from '../../components/nav/Nav';
import Container from '../../components/container';

function EnrollChildPage() {
  return (
    <>

      <Nav store={false} />
      <Container>

        <Hero image={img} title="Tennis Clinic for Secondary Schools" />
        <EnrollChildForm />
      </Container>

    </>
  );
}

export default EnrollChildPage;
