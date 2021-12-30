import { NextApiRequest, NextApiResponse } from "next";
import db from "./db";
import { EncUser, SignedRequest } from "../../helpers/types";
import { verifyJSON } from "../../helpers/encription";
import { readKey, readCleartextMessage } from "openpgp";

export default async function verifyRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const message = await readCleartextMessage({
      cleartextMessage: req.body.toString(),
    });
    const request: SignedRequest = JSON.parse(message.getText());
    const user: EncUser = (
      await db.collection("Users").doc(request.username).get()
    ).data();
    const publicKey = await readKey({ armoredKey: user.pubKey });
    if (await verifyJSON(req.body, publicKey)) {
      return true;
    } else {
      res.status(403).json({ error: "Request not properly signed" });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while verifying signatures: " + error,
    });
  }
}
