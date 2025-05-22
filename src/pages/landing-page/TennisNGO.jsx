import Hero from "../../components/banner/Hero";
import NavInfo from "../../components/nav/NavInfo";
import img from "../../assets/images/ngo/IMG-20250513-WA0028.jpg"
import { useNavigate } from "react-router-dom";
import EnrollChildForm from "./components/EnrollChild";
import Programme from "./components/Programme";
import EventDetails from "./components/EventDetails";
import imgCamp from "../../assets/images/ngo/camp-img.jpg"
import imgCamp1 from "../../assets/images/ngo/camp-img-1.jpg"
import imgCamp2 from "../../assets/images/ngo/6381334.jpg"
function SupportProgram() {
    const navigate = useNavigate()
    return (
        <>
         <NavInfo />
            <Hero image={img} title="Summer Tennis Camp" />

            <section className="md:py-20 px-4 bg-white">
              

            <div className="grid gap-4 max-w-7xl m-auto md:grid-cols-2 items-center mt-10">
            <div>
              <EventDetails/>
            </div>
            <div className="p-4">
              <img src={imgCamp} alt="" className="h-full rounded-lg" />

            </div>

            </div>

            </section>



            <section className="md:py-20 px-4 bg- bg-[#fef9f5]">


            <div className="grid  gap-4 max-w-7xl m-auto md:grid-cols-2 items-center mt-10">
         
            <div className="p-4">
              <img src={imgCamp2} alt="" className="h-full rounded-lg" />

            </div>
               <div>
            <Programme/>
            </div>

            </div>

            
            </section>

            <section className="md:py-20 px-4 bg-gray-50">
            
            <div className="grid gap-4 max-w-7xl m-auto md:grid-cols-2 items-center mt-10">
              <div>
                  <EnrollChildForm/>
              </div>
              <div className=" h-full">
              <img src={imgCamp1} alt="" className="h-full rounded-xl grayscale-0" />

            </div>
            </div>
            </section>



   
      </>
    );
  }


  export default SupportProgram