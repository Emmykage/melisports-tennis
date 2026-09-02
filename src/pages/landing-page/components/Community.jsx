import community1 from "../../../assets/images/landmark.jpg";
import community2 from "../../../assets/images/landmark-2.jpg";
import community3 from "../../../assets/images/landmark-3.jpg";
import community4 from "../../../assets/images/landmark-4.jpg";
import { useEffect, useState } from "react";

const communityImages = [
  { src: community1, caption: "Weekend league matches" },
  { src: community2, caption: "Junior coaching clinics" },
  { src: community3, caption: "Club tournaments" },
  { src: community4, caption: "Gear demo days" },
];

const CommunityGallery = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % communityImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="community-gallery px-12 bg-gray-100 text-gray-800">
      <h2 className="text-3xl text-theme-light font-bold my-10 text-center mb-10">
        Our Tennis Community in Action
      </h2>
      <div className="relative w-full  max-w-4xl mx-auto rounded-xl shadow-md overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {communityImages.map((img) => (
            <div key={img.src} className="w-full flex-shrink-0 relative">
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-80 md:h-96 object-cover"
              />
              <h3 className="font-medium absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm md:text-base py-3 px-6">
                {img.caption}
              </h3>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 right-4 flex gap-2">
          {communityImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === active ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityGallery;
