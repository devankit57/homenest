import clientPromise from "../../../utils/db"; // Your existing db connection

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { listingId, user, date, transactionId } = req.body;

  if (!listingId || !user || !date || !transactionId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("homenest");
    const collection = db.collection("bookings");

    const result = await collection.insertOne({
      listingId,
      user,
      date: new Date(date),
      transactionId,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Booking added", bookingId: result.insertedId });
  } catch (error) {
    console.error("Booking insert error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
