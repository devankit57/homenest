import clientPromise from "../../utils/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const { listingId } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("homenest");

    switch (method) {
      case "PUT":
        const { title, location, price, image, ownerEmail } = req.body;

        const result = await db
          .collection("homes")
          .updateOne(
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
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Error updating the listing" });
  }
}
