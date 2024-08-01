// // pages/api/webhooks.ts
// import { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log(`Request received: ${req.method}`);
//   console.log("Query parameters:", req.query);

//   if (req.method === "GET") {
//     const hubMode = req.query["hub.mode"];
//     const hubChallenge = req.query["hub.challenge"];
//     const hubVerifyToken = req.query["hub.verify_token"];

//     console.log("hubMode:", hubMode);
//     console.log("hubChallenge:", hubChallenge);
//     console.log("hubVerifyToken:", hubVerifyToken);

//     if (
//       typeof hubMode === "string" &&
//       typeof hubChallenge === "string" &&
//       typeof hubVerifyToken === "string" &&
//       hubMode === "subscribe" &&
//       hubVerifyToken === "queuefeed2024@"
//     ) {
//       // Log the verification request
//       console.log("Verification Request:", req.query);

//       // Respond with the hub.challenge value
//       res.status(200).send(hubChallenge);
//     } else {
//       res.status(403).send("Forbidden");
//     }
//   } else if (req.method === "POST") {
//     // Handle event notifications here if needed in the future
//     console.log("Event Notification:", req.body);
//     res.status(200).send("Event received");
//   } else {
//     res.status(405).send("Method Not Allowed");
//   }
// }
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const hubMode = searchParams.get("hub.mode");
  const hubChallenge = searchParams.get("hub.challenge");
  const hubVerifyToken = searchParams.get("hub.verify_token");

  console.log("hubMode:", hubMode);
  console.log("hubChallenge:", hubChallenge);
  console.log("hubVerifyToken:", hubVerifyToken);

  if (hubMode === "subscribe" && hubVerifyToken === "queuefeed2024@") {
    // Log the verification request
    console.log("Verification Request:", searchParams);

    // Respond with the hub.challenge value
    return new NextResponse(hubChallenge, { status: 200 });
  } else {
    return new NextResponse("Forbidden", { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Handle event notifications here if needed in the future
  console.log("Event Notification:", body);
  return new NextResponse("Event received", { status: 200 });
}
