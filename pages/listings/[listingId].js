import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ListingDetails() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const router = useRouter();
  const { listingId } = router.query;

  const { data: session } = useSession();

  useEffect(() => {
    if (!listingId) return;

    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/${listingId}`);
        const data = await res.json();
        if (res.ok) {
          setListing(data);
        } else {
          console.error('Error:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch listing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-20">Loading details...</p>;
  }

  if (!listing) {
    return <p className="text-center text-gray-500 mt-20">Listing not found.</p>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <Navbar />

      <section className="relative bg-[#003B95] text-white py-20 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {listing.title}
          </h1>
          <p className="text-lg md:text-xl">{listing.location}</p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto rounded-3xl bg-white shadow-xl overflow-hidden md:flex">
          <div className="md:w-1/2 h-80 md:h-auto">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold text-[#003B95]">{listing.title}</h2>
              <p className="text-gray-500 text-lg mt-1">{listing.location}</p>
              <p className="text-2xl font-semibold text-blue-600 mt-4">
                ₹{listing.price.toLocaleString()}/night
              </p>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Description</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{listing.description}</p>
              </div>

              {listing.amenities?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800">Amenities</h3>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {listing.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Choose a date"
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto px-6 py-3 bg-[#003B95] hover:bg-blue-800 text-white text-lg rounded-full transition duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center px-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-gray-500 text-xl hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#003B95] mb-4">Manual Payment</h2>
            <p className="text-gray-700 mb-2">Scan the QR code below to make payment:</p>
            <div className="w-full flex justify-center my-4">
              <img
                src="/payment.png"
                alt="Payment QR"
                className="w-48 h-48 object-contain border rounded-md"
              />
            </div>
            <label className="block text-gray-700 font-medium mb-2">
              Enter Transaction ID
            </label>
            <input
              type="text"
              placeholder="Transaction number"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={async () => {
                const userEmail = session?.user?.email;

                if (!userEmail) {
                  toast.error('User is not authenticated');
                  return;
                }

                const response = await fetch('/api/bookings', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    listingId: listing._id,
                    user: userEmail,
                    date: selectedDate,
                    transactionId,
                  }),
                });
                const result = await response.json();

                if (result.bookingId) {
                  toast.success('Booking Confirmed');
                } else {
                  toast.error('Booking Failed');
                }

                setShowModal(false);
                setTransactionId('');
              }}
              className="mt-4 w-full bg-[#003B95] hover:bg-blue-800 text-white px-6 py-2 rounded-md transition"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
