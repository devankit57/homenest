import clientPromise from "../../../utils/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const { listingId } = req.query;

  if (!ObjectId.isValid(listingId)) {
    return res.status(400).json({ error: "Invalid listing ID" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("homenest");
    const collection = db.collection("homes");

    if (method === "PUT") {
      const { title, location, price, image, ownerEmail } = req.body;

      // Optional: Validate required fields
      if (!title || !location || !price || !image || !ownerEmail) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await collection.updateOne(
        { _id: new ObjectId(listingId) },
        {
          $set: {
            title,
            location,
            price,
            image,
            ownerEmail,
          },
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Listing not found" });
      }

      const updatedListing = await collection.findOne({
        _id: new ObjectId(listingId),
      });

      return res.status(200).json(updatedListing);
    }

    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ error: `Method ${method} Not Allowed` });
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Error updating the listing" });
  }
}
