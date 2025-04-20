'use client';

const Footer = () => {
  return (
    <footer className="bg-[#003B95] text-white py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center text-sm">
        <div>&copy; {new Date().getFullYear()} Homenest. All rights reserved.</div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

