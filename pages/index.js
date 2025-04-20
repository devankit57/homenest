'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, CalendarDays, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 relative">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden mt-0">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/main-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/20 shadow-xl rounded-3xl p-10 w-full max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Find Your Perfect <span className="text-blue-400">Homenest</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
              Share your space, or book the perfect getaway with a trusted platform designed for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/login')}
                className="bg-[#003B95] hover:bg-blue-800 text-white px-6 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/listings')}
                className="bg-white hover:bg-gray-100 text-[#003B95] border border-[#003B95] px-6 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105"
              >
                Explore Homes
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-900 py-20 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight text-[#003B95]">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-10">
            Search from thousands of homes across the country.
          </p>

          <div className="bg-white/70 backdrop-blur-lg border border-gray-300 rounded-3xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center bg-white rounded-xl px-4 py-3 w-full md:w-1/3">
              <svg className="w-5 h-5 text-[#003B95] mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z" />
              </svg>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center bg-white rounded-xl px-4 py-3 w-full md:w-1/3">
              <svg className="w-5 h-5 text-[#003B95] mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 7V3m8 4V3m-9 8h10m-13 9h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2z" />
              </svg>
              <input
                type="date"
                className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
              />
            </div>

            <button className="w-full md:w-auto bg-[#003B95] hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-6 md:px-20 py-20 bg-gradient-to-b from-white to-blue-50">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#003B95]">
          Why Choose <span className="text-blue-600">Homenest</span>?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: 'List Your Home',
              desc: "Earn while you're away. Share your space with travelers worldwide.",
              icon: <Home className="w-8 h-8" />,
            },
            {
              title: 'Book with Confidence',
              desc: 'Browse availability, read reviews, and book with peace of mind.',
              icon: <CalendarDays className="w-8 h-8" />,
            },
            {
              title: 'Safety First',
              desc: 'We prioritize your safety with secure booking and user verification.',
              icon: <ShieldCheck className="w-8 h-8" />,
            },
          ].map(({ title, desc, icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-3xl p-10 text-center border border-blue-100"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-700">
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#003B95]">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full px-6 md:px-16 py-24 text-center bg-gradient-to-b from-white via-blue-50 to-blue-100 text-gray-900 rounded-t-3xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative z-10 max-w-6xl mx-auto px-4"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 sm:mb-8 text-[#003B95]">
            Join <span className="text-blue-600">Homenest</span> Today!
          </h2>
          <p className="text-lg md:text-xl mb-6 sm:mb-8 text-gray-700">
            List your space or find your dream home with ease. It’s fast, secure, and hassle-free.
          </p>
          <button
            onClick={() => router.push('/register')}
            className="bg-[#003B95] hover:bg-blue-800 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all transform hover:scale-105"
          >
            Get Started
          </button>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
