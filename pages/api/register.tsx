import { NextApiRequest, NextApiResponse } from "next";
import db from "./db";

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const docRef = db.collection("Users").doc(req.body.username);

  await docRef.set({
    pubKey: req.body.pubKey,
    encPrivKey: req.body.encPrivKey,
  });

  res.status(200).end();
}
