'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ListingsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listings');
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter(home =>
    home.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
    home.price >= minPrice &&
    home.price <= maxPrice
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <Navbar />

      <div className="h-24 bg-gradient-to-b from-[#003B95] to-transparent w-full absolute top-0 left-0 z-0"></div>

      {/* Search Section */}
      <section className="relative bg-[#003B95] text-white py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-10">
            Search from thousands of homes across the country.
          </p>

          <div className="bg-white/80 backdrop-blur-md border border-gray-300 rounded-3xl shadow-xl p-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            {/* Location */}
            <div className="flex items-center bg-white rounded-xl px-4 py-3 w-full sm:w-[48%] lg:w-[30%]">
              <svg className="w-5 h-5 text-[#003B95] mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z" />
              </svg>
              <input
                type="text"
                placeholder="Enter location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Date Picker */}
            <div className="flex items-center bg-white rounded-xl px-4 py-3 w-full sm:w-[48%] lg:w-[30%]">
              <svg className="w-5 h-5 text-[#003B95] mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 7V3m8 4V3m-9 8h10m-13 9h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2z" />
              </svg>
              <input
                type="date"
                className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-xl px-4 py-3 w-full lg:w-[35%]">
              <div className="flex justify-between text-sm text-[#003B95] mb-2">
                <span>₹{minPrice}</span>
                <span>₹{maxPrice}</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div className="absolute bg-[#003B95] h-2 rounded-full"
                  style={{
                    left: `${(minPrice / 100000) * 100}%`,
                    width: `${((maxPrice - minPrice) / 100000) * 100}%`
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="absolute w-full opacity-0 cursor-pointer z-10"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="absolute w-full opacity-0 cursor-pointer z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="pb-20 px-4 sm:px-6 lg:px-20 mt-12 flex-grow">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading listings...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.length ? (
                filteredListings.map((home, index) => (
                  <motion.div
                    key={home._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden transition-all"
                  >
                    <img
                      src={home.image}
                      alt={home.title}
                      className="w-full h-60 object-cover"
                    />
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-[#003B95]">
                        {home.title}
                      </h2>
                      <p className="text-gray-600">{home.location}</p>
                      <p className="text-lg font-medium text-blue-600 mt-2">
                        ₹{home.price.toLocaleString()}/night
                      </p>
                      <Link
                        href={`/listings/${home._id}`}
                        className="inline-block mt-4 text-sm text-white bg-[#003B95] hover:bg-blue-800 px-4 py-2 rounded-full transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  No listings found for this location or price range.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
