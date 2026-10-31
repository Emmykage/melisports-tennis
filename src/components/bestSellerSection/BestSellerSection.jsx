import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Recycle,
  RotateCw,
  Scale,
  Star,
  StarHalfIcon,
  StarIcon,
  StarOff,
  Stars,
  Truck,
} from "lucide-react";
import { Security, StarsOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const descriptionClass = "flex items-center gap-2 flex-1";

const deliveries = [
  {
    icon: <Truck />,
    title: "Free Shipping",
    desc: "Free Shipping",
  },
  {
    icon: <Recycle />,
    title: "Easy Returns",
    desc: "Within 7 days",
  },
  {
    icon: <Security />,
    title: "Secure pyment",
    desc: "100% secure checkout",
  },
];
export default function BestSellerSection({
  product,
  onViewProduct,
  interval = 3000,
}) {
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

  const isDiscountActive = product.discount === "active_discount";

  return (
    <aside
      className="overflow-hidden rounded-2xl border border-neutral-200
        bg-gray-50"
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
      <div className="flex md:flex-row flex-col">
        {/* Product image slider */}
        <div className="relative flex-1 aspect-[5/4] overflow-hidden bg-white h-80 shrink-0">
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
        <div className="p-4 flex-[2] w-full">
          {product.category && (
            <p
              className="text-[10px] font-normal! uppercase
            tracking-wider text-neutral-500"
            >
              {product.category}
            </p>
          )}
          <h4 className="mt-1 text-base font-normal text-neutral-900">
            {product.name}
          </h4>
          <div className="flex gap-3 py-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="" />
            ))}

            <span className="font-bold">4.5 (120 reviews)</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold text-neutral-950">
              {formatPrice(
                isDiscountActive ? product.discount_amount : product.price,
              )}
            </span>

            {isDiscountActive && (
              <>
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span
                  className="rounded bg-red-50 px-2 py-1
                text-[10px] font-bold text-red-600"
                >
                  {product.discount_percentage}% OFF
                </span>
              </>
            )}
          </div>
          <p
            className="line-clamp-3 text-sm my-4 leading-5
            text-neutral-500"
          >
            {product.description ||
              "The Babolat Pure Aero for aggressive players who want maximum spin and control. its areodynamic frame and enhanced string pattern help you generate more spin and power with every shot"}
          </p>

          <div className="flex flex-col md:flex-row md:gap-6">
            <div className={descriptionClass}>
              <img
                src="/assets/icons/spinning-tennis-ball-icon.png"
                className={"h-10"}
              />
              <span className="text-xs font-bold">
                Spin Friendly Technology
              </span>
            </div>

            <div className={descriptionClass}>
              <img
                src="/assets/icons/balanced-tennis-racket.png"
                className={"h-10"}
              />
              <span className="text-xs font-bold ">100 sq. In Head Size</span>
            </div>
            <div className={descriptionClass}>
              <img
                src="/assets/icons/tennis-racket-size.png"
                className={"h-10"}
              />
              <span className="text-xs font-bold">320 mm Balance</span>
            </div>
          </div>
        </div>

        {/* delivery information   */}
        <div className="max-w-lg flex-1 px-2">
          <Link
            type="button"
            to={`/product-details/${product.id})`}
            className="mt-4 flex w-full items-center justify-center
            gap-2 rounded-md bg-secondary px-4 py-3
            text-sm font-semibold text-white transition
            hover:bg-neutral-700"
          >
            View product
            <ArrowRight size={16} />
          </Link>

          <div className="mt-5 space-y-4">
            {deliveries.map((d) => (
              <div className="flex gap-4">
                <span>{d.icon}</span>
                <div>
                  <p className="font-semibold">{d.title} </p>
                  <p className="text-gray-600 text-sm">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
