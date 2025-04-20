import clientPromise from "../../../utils/db"; 

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("homenest");
    const collection = db.collection("homes");

    const homes = await collection.find({}).toArray();

    res.status(200).json(homes);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
