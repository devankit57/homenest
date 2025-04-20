import clientPromise from "../../utils/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"; 

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userEmail = session.user.email;

    const client = await clientPromise;
    const db = client.db("homenest");

    const bookingsCollection = db.collection("bookings");
    const listingsCollection = db.collection("homes");

    const bookings = await bookingsCollection.find({ user: userEmail }).toArray();

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    const bookingsWithListings = await Promise.all(
      bookings.map(async (booking) => {
        let listing;

        try {
          listing = await listingsCollection.findOne({
            _id: new ObjectId(booking.listingId),
          });
        } catch (e) {
          console.warn("Invalid listingId ObjectId:", booking.listingId);
        }

        return {
          ...booking,
          listingTitle: listing?.title || "Unknown",
          listingLocation: listing?.location || "Unknown",
          listingPrice: listing?.price || "N/A",
          listingImage: listing?.image || null,
        };
      })
    );

    res.status(200).json(bookingsWithListings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
