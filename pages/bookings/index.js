import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.email) {
        toast.error('User not authenticated');
        return;
      }

      try {
        const response = await fetch('/api/fetch-booking');
        const data = await response.json();

        if (response.ok) {
          setBookings(data);
        } else {
          
        }
      } catch (error) {
        toast.error('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchBookings();
    }
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <Navbar />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="relative bg-[#003B95] text-white py-16 px-6 md:px-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Your Bookings</h1>
            <p className="text-blue-100 text-md md:text-lg">All your stays in one place</p>
          </div>
        </section>

        {/* Booking Content */}
        <section className="py-10 px-4 md:px-16">
          {bookings.length === 0 && !loading ? (
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">You have no bookings yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="lg:w-1/3 w-full h-52 lg:h-48">
                    <img
                      src={booking.listingImage || "/no-image.png"}
                      alt={booking.listingTitle}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="lg:w-2/3 w-full p-5 md:p-6 flex flex-col justify-between">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h2 className="text-2xl font-semibold text-[#003B95]">{booking.listingTitle}</h2>
                      <span className="text-blue-700 text-lg font-medium mt-2 md:mt-0">
                        ₹{booking.listingPrice?.toLocaleString() || "N/A"}
                        <span className="text-sm font-normal text-gray-500"> / night</span>
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-1">
                      📍 <span className="font-medium">{booking.listingLocation}</span>
                    </p>

                    <div className="text-gray-700 text-sm mt-3 space-y-1">
                      <p>
                        <span className="font-medium">📅 Booked on:</span>{" "}
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">🆔 Transaction Id:</span> {booking.transactionId}
                      </p>
                    </div>

                    <div className="mt-4">
                      <button className="inline-block bg-[#003B95] text-white text-sm px-5 py-2 rounded-xl hover:bg-[#002766] transition duration-300 shadow-md">
                        View Listing
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
