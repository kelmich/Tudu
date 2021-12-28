import { NextApiRequest, NextApiResponse } from "next";
import db from "./db";

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  try {
    const docRef = db.collection("Users").doc(req.body.username);
    // use create?
    await docRef.set({
      pubKey: req.body.pubKey,
      encPrivKey: req.body.encPrivKey,
    });
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error: process.env });
  }
}
