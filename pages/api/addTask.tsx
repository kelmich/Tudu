import { NextApiRequest, NextApiResponse } from "next";
import db from "./db";
import verifyRequest from "./verifyRequest";
import { readCleartextMessage } from "openpgp";
import { SignedRequest } from "../../helpers/types";

export default async function addTask(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // verify signature
    if (await verifyRequest(req, res)) {
      const message = await readCleartextMessage({
        cleartextMessage: req.body.toString(),
      });
      const request: SignedRequest = JSON.parse(message.getText());

      // add task
      const firestoreTask = await db.collection("Tasks").add(request);
      res.status(200).json({ id: firestoreTask.id });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not add the task: " + error });
  }
}
