import React, { useRef } from 'react';
import { nairaFormat } from '../../utils/nairaFormat';
import Button from '../buttons/Button';

// SimilarItemsSection.jsx
// Props:
// - items: Array of { id, title, price, imageUrl, subtitle }
// - title: string
// - onSelect: function(item) when an item is clicked
// - loading: boolean

export default function SimilarItemsSection({
  items = [],
  error = false,
  title = 'Similar items',
  onSelect = () => {},
  loading = false,
}) {
  const scrollerRef = useRef(null);

  const scroll = (dir = 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollTo({ left: dir === 'right' ? el.scrollLeft + amount : el.scrollLeft - amount, behavior: 'smooth' });
  };

  console.log(error);

  return (
    <section aria-labelledby="similar-items-heading" className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 id="similar-items-heading" className="text-2xl font-normal">
          {title}
        </h3>
        <div className="hidden sm:flex gap-2">
          <Button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            ‹
          </Button>
          <Button
            type="button"
            onClick={() => scroll('right')}
            ariaLabel="Scroll right"
            className="p-2 rounded-md hover:bg-gray-100"
          >
            ›
          </Button>
        </div>
      </div>

      {/* Horizontal scroller for small+ screens; grid for larger screens */}
      <div
        ref={scrollerRef}
        className="relative overflow-x-auto scroll-smooth no-scroll-bar bg-gray no-scrollbar  rounded shadow rounded-sm py-2"
        role="list"
        aria-label="Similar product items"
      >
        <div className="flex gap-4 px-1 min-w-max  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
          { loading
            ? // simple skeleton placeholders
            Array.from({ length: 5 }).map((_, i) => (
              <article
                key={i}
                className="w-56 flex-shrink-0 bg-white rounded-lg shadow-sm p-3 animate-pulse"
                aria-hidden="true"
              >
                <div className="h-36 bg-gray-200 rounded-md mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </article>
            ))
            : error ? <h3> Something  went wrong</h3>
              : items?.length === 0
                ? (
                  <div className="px-3 py-6 text-sm text-gray-500">No similar items found.</div>
                )
                : items?.map((item) => (
                  <SimilarItemCard key={item.id} item={item} onSelect={onSelect} />
                ))}
        </div>
      </div>
    </section>
  );
}

function SimilarItemCard({ item, onSelect }) {
  const {
    name: title, subtitle, price, photo_urls,
  } = item;
  return (
    <article
      role="listitem"
      tabIndex={0}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(item)}
      className="w-60 flex-shrink-0 bg-white rounded-lg shadow-sm p-3 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
    >
      <div className="relative h-36 mb-3 bg-gray-50 rounded-md overflow-hidden">
        {/* Use loading="lazy" for non-critical images */}
        <img
          src={photo_urls?.[0]}
          alt={title}
          loading="lazy"
          className="object-cover w-full h-full"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="100%" height="100%" fill="%23f3f4f6"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial,Helvetica,sans-serif" font-size="14"%3EImage%20unavailable%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>

      <h4 className="text-sm font-medium text-gray-900 truncate" title={title}>
        {title}
      </h4>
      {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
      {price !== undefined && (
        <div className="mt-2 text-sm font-semibold">{nairaFormat(price)}</div>
      )}
    </article>
  );
}

/*
Usage notes (example props shape):
items = [
  { id: '1', title: 'Product A', subtitle: 'Size L • Blue', price: '$29', imageUrl: 'https://...' },
  ...
]

Import and use:
<SimilarItemsSection items={items} onSelect={(item) => console.log('clicked', item)} loading={false} />

Tailwind classes assume Tailwind is configured in your app. The component is intentionally framework-agnostic (works in CRA, Next.js, etc.).
*/
