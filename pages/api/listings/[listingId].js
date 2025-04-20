import { ObjectId } from "mongodb";
import clientPromise from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { listingId } = req.query;

  if (!listingId) {
    return res.status(400).json({ message: "Listing ID is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("homenest");
    const collection = db.collection("homes");

    const home = await collection.findOne({ _id: new ObjectId(listingId) });

    if (!home) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(home);
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
