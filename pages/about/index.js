import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50 text-gray-800 font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#003B95] text-white py-20 px-6 md:px-24 text-center">
          <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-lg max-w-3xl mx-auto text-blue-100">
            Empowering your travel experiences with technology, transparency, and trust.
          </p>
        </section>

        {/* Mission and Vision */}
        <section className="py-16 px-6 md:px-24 grid md:grid-cols-2 gap-12 bg-white">
          <div className="bg-blue-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-3xl font-bold text-[#003B95] mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To revolutionize how people travel by offering a seamless platform to explore, book, and enjoy stays with confidence and comfort.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-3xl font-bold text-[#003B95] mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We aim to be the go-to platform for travel and accommodation—trusted by millions globally for its ease, elegance, and efficiency.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-6 md:px-24 bg-gradient-to-br from-blue-50 to-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#003B95] mb-2">Meet the Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A passionate team of creators, thinkers, and doers bringing this platform to life.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {["Ankit", "Shreya", "Vatsal"].map((name, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 mb-4 flex items-center justify-center text-[#003B95] text-3xl font-semibold">
                  {name[0]}
                </div>
                <h3 className="text-xl font-semibold text-[#003B95]">{name}</h3>
                <p className="text-gray-500 text-sm">Frontend Developer</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 md:px-24 bg-[#003B95] text-white text-center rounded-t-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let’s Build Something Great Together</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-blue-100">
            Whether you're planning a trip or building a platform like ours — let's connect, collaborate, and create.
          </p>
          <button className="bg-white text-[#003B95] px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-gray-100 transition">
            Contact Us
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
