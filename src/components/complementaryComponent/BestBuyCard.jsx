import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";

const AlternateProduct = ({ product, onViewProduct, interval = 3000 }) => {
  const navigate = useNavigate();
  const images = product?.photo_urls?.length
    ? product.photo_urls
    : [product?.image].filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [product?.id]);

  useEffect(() => {
    if (images.length < 2 || paused) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, paused]);

  if (!product || images.length === 0) return null;

  const changeImage = (direction) => {
    setActiveIndex(
      (current) => (current + direction + images.length) % images.length,
    );
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <aside
      className="overflow-hidden rounded-2xl border border-neutral-200
        bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Heading */}
      <div
        className="flex items-center justify-between border-b
        border-neutral-100 px-4 py-3"
      >
        <div>
          <p
            className="text-[10px] font-semibold uppercase
            tracking-[0.18em] text-neutral-500"
          >
            Recommended for you
          </p>
          <h3 className="mt-1 text-sm font-normal text-neutral-900">
            {product.recommendationLabel || "Best seller"}
          </h3>
        </div>

        <Flame size={18} className="text-orange-500" />
      </div>

      {/* Product image slider */}
      <div className="relative aspect-[5/4] overflow-hidden bg-neutral-50">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${product.name} view ${index + 1}`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-contain
              p-5 transition-opacity duration-700
              ${activeIndex === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => changeImage(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2
                rounded-full bg-white p-2 shadow-sm"
            >
              <ChevronLeft size={17} />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={() => changeImage(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2
                rounded-full bg-white p-2 shadow-sm"
            >
              <ChevronRight size={17} />
            </button>

            <div
              className="absolute bottom-3 left-0 right-0 flex
              justify-center gap-1.5"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1 rounded-full transition-all ${
                    activeIndex === index
                      ? "w-5 bg-neutral-900"
                      : "w-2 bg-neutral-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product information */}
      <div className="p-4">
        {product.category && (
          <p
            className="text-[10px] font-semibold uppercase
            tracking-wider text-neutral-500"
          >
            {product.category}
          </p>
        )}

        <h4 className="mt-1 text-base font-bold text-neutral-900">
          {product.name}
        </h4>

        {product.description && (
          <p
            className="mt-1 line-clamp-2 text-xs leading-5
            text-neutral-500"
          >
            {product.description}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-neutral-950">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice > product.price && (
            <>
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span
                className="rounded bg-red-50 px-2 py-1
                text-[10px] font-bold text-red-600"
              >
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100,
                )}
                % OFF
              </span>
            </>
          )}
        </div>

        <Button
          type="button"
          onClick={() => navigate(`/products-details/${product.id}`)}
          className="mt-4 flex w-full items-center justify-center text-white
            gap-2 rounded-full px-4 py-3
            text-sm font-semibold bg-secondary
            hover:text-white"
        >
          View product
          <ArrowRight size={16} />
        </Button>
      </div>
    </aside>
  );
};
export default AlternateProduct;
