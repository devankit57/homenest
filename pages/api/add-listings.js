import clientPromise from "../../utils/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const { listingId } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("homenest");

    switch (method) {
      case "POST":
        // Create a new listing
        const { title, location, price, image, ownerEmail } = req.body;

        if (!title || !location || !price || !image || !ownerEmail) {
          return res.status(400).json({ error: "All fields are required" });
        }

        const newListing = {
          title,
          location,
          price,
          image,
          ownerEmail,
          createdAt: new Date(),
        };

        const insertResult = await db.collection("homes").insertOne(newListing);

        res.status(201).json({ message: "Listing added successfully", id: insertResult.insertedId });
        break;

      case "PUT":
        // Update an existing listing
        const { title: updatedTitle, location: updatedLocation, price: updatedPrice, image: updatedImage, ownerEmail: updatedOwnerEmail } = req.body;

        const result = await db.collection("homes").updateOne(
          { _id: new ObjectId(listingId) },
          {
            $set: {
              title: updatedTitle,
              location: updatedLocation,
              price: updatedPrice,
              image: updatedImage,
              ownerEmail: updatedOwnerEmail,
            },
          }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).json({ error: "Listing not found or no changes made" });
        }

        const updatedListing = await db
          .collection("homes")
          .findOne({ _id: new ObjectId(listingId) });

        res.status(200).json(updatedListing);
        break;

      default:
        res.status(405).json({ error: `Method ${method} Not Allowed` });
        break;
    }
  } catch (error) {
    console.error("Error handling listing:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
}
