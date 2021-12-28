import { NextApiRequest, NextApiResponse } from "next";
import db from "./db";

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  try {
    const doc = await db.collection("Users").doc(req.body.username).get();
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: "Username does not exist" });
  }
}
