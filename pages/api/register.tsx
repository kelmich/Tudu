import { NextApiRequest, NextApiResponse } from "next";
import db from "./db";
import { EncUser } from "../../helpers/types";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let newUser: EncUser = req.body;
    const docRef = db.collection("Users").doc(newUser.username);
    await docRef.create({
      pubKey: newUser.pubKey,
      encPrivKey: newUser.encPrivKey,
    });
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: "Username already exists" });
  }
}
