'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-lg bg-white/80 shadow-md border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-3 flex justify-between items-center">
        <div
          className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-[#003B95]' : 'text-white'
          }`}
        >
          Homenest
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className={`md:hidden p-2 rounded focus:outline-none transition-colors ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}
        >
          {showMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <nav
          className={`hidden md:flex gap-4 md:gap-6 text-sm md:text-base font-medium transition-colors duration-300 ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}
        >
          <NavbarLinks session={session} status={status} />
        </nav>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-6 py-4 text-gray-800 space-y-3">
          <NavbarLinks session={session} status={status} isMobile />
        </div>
      )}
    </header>
  );
};

const NavbarLinks = ({ session, status, isMobile = false }) => {
  const linkClass = `block ${
    isMobile
      ? 'w-full py-2 px-3 rounded hover:bg-gray-100'
      : 'px-4 py-2 rounded-full hover:bg-white/20 hover:scale-105'
  } transition-all duration-200`;

  return (
    <>
      {[{ label: 'Home', href: '/' }, { label: 'Listings', href: '/listings' }, { label: 'About', href: '/about' }].map(
        ({ label, href }) => (
          <Link key={href} href={href} className={linkClass}>
            {label}
          </Link>
        )
      )}

      {status === 'authenticated' ? (
        <>
          <Link href="/bookings" className={linkClass}>
            My Bookings
          </Link>
          <Link href="/my-listings" className={linkClass}>
            My Listings
          </Link>
          <div className={`flex items-center gap-2 ${isMobile ? '' : 'px-4'}`}>
            <img
              src={session.user?.image}
              alt="Profile"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className={`${isMobile ? '' : 'hidden'}`}>{session.user?.name}</span>
          </div>
          <button
            onClick={() => signOut()}
            className={`${
              isMobile
                ? 'w-full py-2 px-3 rounded bg-red-500 hover:bg-red-600 text-white font-semibold'
                : 'px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold hover:scale-105'
            } transition-all duration-200`}
          >
            Logout
          </button>
        </>
      ) : (
        <Link href="/login" className={linkClass}>
          Login
        </Link>
      )}
    </>
  );
};

export default Navbar;
