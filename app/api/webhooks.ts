// pages/api/callback.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const hubMode = req.query["hub.mode"];
    const hubChallenge = req.query["hub.challenge"];
    const hubVerifyToken = req.query["hub.verify_token"];

    if (
      typeof hubMode === "string" &&
      typeof hubChallenge === "string" &&
      hubVerifyToken === "queuefeed2024@"
    ) {
      // Log the verification request
      console.log("Verification Request:", req.query);

      // Respond with the hub.challenge value
      res.status(200).send(hubChallenge);
    } else {
      res.status(403).send("Forbidden");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
