import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShoppingBag,
  Sparkles,
  Tag,
} from "lucide-react";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { nairaFormat } from "../../utils/nairaFormat";

const ProductCard = ({ product, onProductClick }) => {
  // const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  // const [newInventory, setNewInventory] = useState([]);
  const dispatch = useDispatch();
  const handleCart = () => {
    if (product.product_quantity <= 0) {
      alert("Out of Stock");
      return;
    }

    const isDiscounted = product.discount === "active_discount";
    const inventory = product.product_inventories[0];
    const cartItem = {
      product_id: product.id,
      id: inventory?.id,
      sku: inventory?.sku,
      image: product.photo_urls?.[0] || product.image,
      price: isDiscounted ? product.discount_amount : product.price,
      quantity: 1,
      product_name: product.name,
      size: inventory?.size,
      colours: product.colours,
      category: product.product_category?.name,
      ...(isDiscounted && {
        discount_amount: product.price,
      }),
    };

    dispatch(addToCart([cartItem]));
    setSelectedItem(null);
  };

  const images = product.photo_urls?.length
    ? product.photo_urls
    : [product.photo_urls].filter(Boolean);

  const [activeImage, setActiveImage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActiveImage(0);
  }, [product.id]);

  useEffect(() => {
    if (images.length < 2 || paused) return;

    const timer = setInterval(() => {
      setActiveImage((index) => (index + 1) % images.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [images.length, paused]);

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const typeStyles = {
    deal: "bg-red-600 text-white",
    premium: "bg-neutral-950 text-white",
    similar: "bg-white text-neutral-800 border border-neutral-200",
  };

  const typeLabels = {
    deal: "SPECIAL OFFER",
    premium: "PREMIUM PICK",
    similar: "YOU MAY LIKE",
  };

  return (
    <article
      className="group min-w-0 overflow-hidden rounded-2xl border
        border-neutral-200 bg-white transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Product image */}
      <div className="relative aspect-[4/4.4] overflow-hidden bg-[#f5f5f3]">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${product.name} - view ${index + 1}`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-contain
              p-5 transition-all duration-700 ease-in-out
              group-hover:scale-[1.04]
              ${activeImage === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {/* Product category badge */}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1.5
            text-[9px] font-bold tracking-wider
            ${typeStyles[product.type] || typeStyles.similar}`}
        >
          {product.type === "premium" && (
            <Sparkles size={11} className="mr-1 inline" />
          )}
          {product.type === "deal" && <Tag size={11} className="mr-1 inline" />}
          {product.badge || typeLabels[product.type] || typeLabels.similar}
        </span>

        {discount > 0 && (
          <span
            className="absolute right-3 top-3 rounded-full
            bg-red-600 px-2.5 py-1.5 text-xs font-bold text-white"
          >
            -{discount}%
          </span>
        )}

        {/* Image position indicators */}
        {images.length > 1 && (
          <div
            className="absolute bottom-3 left-0 right-0 flex
            justify-center gap-1.5"
          >
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show image ${index + 1}`}
                onClick={() => setActiveImage(index)}
                className={`h-1 rounded-full transition-all
                  ${
                    activeImage === index
                      ? "w-6 bg-neutral-900"
                      : "w-3 bg-neutral-300"
                  }`}
              />
            ))}
          </div>
        )}

        {/* Quick view */}
        <button
          type="button"
          onClick={() => navigate(`/product-details/${product.id}`)}
          className="absolute bottom-3 right-3 flex translate-y-2
            items-center gap-1.5 rounded-full bg-white px-3 py-2
            text-xs font-semibold opacity-0 shadow-md transition
            group-hover:translate-y-0 group-hover:opacity-100
            focus:translate-y-0 focus:opacity-100"
        >
          Quick view <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Product information */}
      <div className="p-4">
        <p
          className="mb-1 text-[10px] font-semibold uppercase
          tracking-[0.15em] text-neutral-500"
        >
          {product.category}
        </p>

        <button
          type="button"
          onClick={() => onProductClick?.(product)}
          className="line-clamp-2 min-h-10 text-left text-sm
            font-semibold leading-5 text-neutral-900
            transition hover:text-neutral-500"
        >
          {product.name}
        </button>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-base font-bold text-neutral-950">
            {nairaFormat(product.price)}
          </span>

          {discount > 0 && (
            <span className="text-xs text-neutral-400 line-through">
              {nairaFormat(product.originalPrice)}
            </span>
          )}
        </div>

        {product.type === "premium" && (
          <p className="mt-2 text-xs text-neutral-500">
            An upgrade worth considering
          </p>
        )}

        <Button
          type="button"
          onClick={() => handleCart()}
          className="mt-4 flex w-full items-center justify-center gap-2
            rounded-full border border-neutral-900 px-3 py-3
            text-xs font-bold transition hover:bg-secondary
            hover:text-white"
        >
          <ShoppingBag size={15} />
          Add to cart
        </Button>
      </div>
    </article>
  );
};

const ProductDiscovery = ({
  title = "Worth a look",
  subtitle = "More to explore. Better deals. Bigger game.",
  products = [],
  onProductClick,
}) => {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (!trackRef.current) return;

    trackRef.current.scrollBy({
      left: direction * trackRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  if (!products.length) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div
              className="mb-3 flex items-center gap-2 text-xs
              font-bold uppercase tracking-[0.2em] text-neutral-500"
            >
              <Sparkles size={14} />
              Curated for you
            </div>

            <h2
              className="text-2xl font-normal tracking-tight
              text-neutral-950 sm:text-3xl"
            >
              {title}
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
              {subtitle}
            </p>
          </div>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => scroll(-1)}
              className="rounded-full border border-neutral-200 p-3
                transition hover:bg-neutral-100"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              aria-label="Next products"
              onClick={() => scroll(1)}
              className="rounded-full bg-neutral-950 p-3 text-white
                transition hover:bg-neutral-700"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        {/* Horizontal product carousel */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto
            scroll-smooth pb-4 [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[72%] shrink-0 snap-start
                sm:w-[44%] lg:w-[calc(25%-12px)]"
            >
              <ProductCard product={product} onProductClick={onProductClick} />
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-neutral-400">
            Discover your next favourite
          </p>

          <div className="flex gap-2 sm:hidden">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => scroll(-1)}
              className="rounded-full border border-neutral-200 p-2"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={() => scroll(1)}
              className="rounded-full border border-neutral-200 p-2"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDiscovery;
