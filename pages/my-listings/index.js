import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchListings = async () => {
      if (!session?.user?.email) {
        toast.error('User not authenticated');
        return;
      }

      try {
        const response = await fetch('/api/fetch-listings');
        const data = await response.json();

        if (response.ok) {
          setListings(data);
        } else {
          toast.error('Error fetching listings');
        }
      } catch (error) {
        toast.error('Error fetching listings');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchListings();
    }
  }, [session]);

  const handleEditClick = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedListing = {
      ...selectedListing,
      title: e.target.title.value,
      price: e.target.price.value,
      location: e.target.location.value,
      image: e.target.image.value,
    };
  
    try {
      const response = await fetch(`/api/edit-listings/${selectedListing._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedListing),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Listing updated:", data);
        toast.success("Listing updated successfully!");
  
        // Update local state with the new data
        setListings((prev) =>
          prev.map((item) => (item._id === data._id ? data : item))
        );
  
        handleCloseModal(); 
      } else {
        const error = await response.json();
        console.error("Error updating listing:", error);
        toast.error(error?.error || "Failed to update listing");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating");
    }
  };
  
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <Navbar />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="relative bg-[#003B95] text-white py-16 px-6 md:px-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Your Listings</h1>
            <p className="text-blue-100 text-md md:text-lg">All your properties in one place</p>
          </div>
        </section>

        {/* Listings Content */}
        <section className="py-10 px-4 md:px-16">
          {listings.length === 0 && !loading ? (
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">You have no listings yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {listings.map((listing) => (
                <div
                  key={listing._id}
                  className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="lg:w-1/3 w-full h-52 lg:h-48">
                    <img
                      src={listing.image || "/no-image.png"}
                      alt={listing.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="lg:w-2/3 w-full p-5 md:p-6 flex flex-col justify-between">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h2 className="text-2xl font-semibold text-[#003B95]">{listing.title}</h2>
                      <span className="text-blue-700 text-lg font-medium mt-2 md:mt-0">
                        ₹{listing.price?.toLocaleString() || "N/A"}
                        <span className="text-sm font-normal text-gray-500"> / night</span>
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-1">
                      📍 <span className="font-medium">{listing.location}</span>
                    </p>

                    <div className="text-gray-700 text-sm mt-3 space-y-1">
                      <p>
                        <span className="font-medium">📅 Listed on:</span>{" "}
                        {new Date(listing.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEditClick(listing)}
                        className="inline-block bg-[#003B95] text-white text-sm px-5 py-2 rounded-xl hover:bg-[#002766] transition duration-300 shadow-md"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal for Editing Listing */}
      {isModalOpen && selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-semibold text-[#003B95] mb-4">Edit Listing</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={selectedListing.title}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={selectedListing.price}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  defaultValue={selectedListing.location}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  defaultValue={selectedListing.image}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#003B95] text-white px-4 py-2 rounded-md hover:bg-[#002766]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
