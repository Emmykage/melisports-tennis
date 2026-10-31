import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImagePreview = ({
  images = [],
  interval = 3000,
  productName = "Product",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, isPaused]);

  if (!images.length) return null;

  const nextImage = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  return (
    <div
      className="group w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        {images.map((image, index) => (
          <img
            key={image.id ?? image.src ?? index}
            src={image.src ?? image}
            alt={`${productName} view ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-contain p-4
              transition-opacity duration-700 ease-in-out
              ${activeIndex === index ? "opacity-100" : "opacity-0"}`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Previous button */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous product image"
              className="absolute left-3 top-1/2 -translate-y-1/2
                rounded-full bg-white/90 p-2 shadow
                opacity-0 transition group-hover:opacity-100
                focus:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next product image"
              className="absolute right-3 top-1/2 -translate-y-1/2
                rounded-full bg-white/90 p-2 shadow
                opacity-0 transition group-hover:opacity-100
                focus:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-5 bg-gray-900"
                    : "w-1.5 bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      {/* Thumbnail images */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.id ?? image.src ?? index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Select image ${index + 1}`}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg
                border-2 bg-gray-50 transition
                ${
                  activeIndex === index
                    ? "border-gray-900"
                    : "border-transparent hover:border-gray-300"
                }`}
            >
              <img
                src={image.src ?? image}
                alt=""
                className="h-full w-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default ImagePreview;
