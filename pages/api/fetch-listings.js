import clientPromise from "../../utils/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"; 

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Get the session (logged-in user)
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userEmail = session.user.email;

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("homenest");

    // Fetch homes where the logged-in user is the owner
    const homes = await db.collection("homes").find({ ownerEmail: userEmail }).toArray();

    // If no homes found, return a 404 response
    if (homes.length === 0) {
      return res.status(404).json({ message: "No homes found for this owner" });
    }

    // Return the fetched homes data
    res.status(200).json(homes);
  } catch (error) {
    console.error("Error fetching homes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
