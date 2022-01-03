import { NextApiRequest, NextApiResponse } from "next";
import db from "./db";
import verifyRequest from "./verifyRequest";
import { SignedRequest, MonthTasksQuery, Task } from "../../helpers/types";

export default async function getTasks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // verify signature
    const request: SignedRequest = await verifyRequest(req, res);

    // query tasks
    const query = request.data as MonthTasksQuery;
    const snapshot = await db
      .collection("Tasks")
      .where("username", "==", request.username)
      .where("year", "==", query.year)
      .where("month", "==", query.month)
      .get();
    let tasks = [];
    snapshot.forEach((doc) => {
      let task: Task = {
        id: doc.id,
        ...doc.data(),
      };
      tasks.push(task);
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Could not get the tasks: " + error });
  }
}
