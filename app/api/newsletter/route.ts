import { NextResponse } from "next/server";
import * as mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER || "";
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

if (!MAILCHIMP_API_KEY) throw new Error("[MAILCHIMP_API_KEY] is required");
if (!MAILCHIMP_SERVER) throw new Error("[MAILCHIMP_SERVER] is required");
if (!MAILCHIMP_AUDIENCE_ID)
  throw new Error("[MAILCHIMP_MARKETING_AUDIENCE_ID] is required");

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER,
});

export async function POST(req: Request) {
  const { email, firstName, lastName, tags = [], note } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const subscriberHash = md5(email.toLowerCase());

  const contact = {
    email_address: email,
    tags: ["org:monark", ...tags],
    merge_fields: {
      FNAME: firstName || "",
      LNAME: lastName || "",
    },
    status_if_new: "subscribed" as mailchimp.Status,
  };

  try {
    await mailchimp.lists.setListMember(
      MAILCHIMP_AUDIENCE_ID!,
      subscriberHash,
      contact
    );
    await fetch(
      `https://api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}/notes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note }),
      }
    );
    return NextResponse.json(
      { status: "ok", message: "Subscribed", email },
      { status: 200 }
    );
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
