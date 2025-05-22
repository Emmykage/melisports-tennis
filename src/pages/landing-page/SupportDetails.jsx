import Hero from "../../components/banner/Hero";
import NavInfo from "../../components/nav/NavInfo";
import img from "../../assets/images/ngo/IMG-20250513-WA0021.jpg"
import EnrollChildForm from "./components/EnrollChild";

function EnrollChildPage() {
    return (
        <>
        
        <NavInfo />
            <Hero image={img} title="Summer Tennis Camp" />
            <EnrollChildForm/>
      </>
    );
  }
  
  export default EnrollChildPage