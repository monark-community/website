import { BeehiivClient, BeehiivError } from "@beehiiv/sdk";
import { NextResponse } from "next/server";

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || "";

if (!BEEHIIV_API_KEY) throw new Error("[BEEHIIV_API_KEY] environment variable is required.");

type NewsletterContact = {
    email: string;
    first_name: string;
    last_name: string;
    tags: string[];
};

type NewsletterUTM = {
    source: string;
    medium: string;
    campaign: string;
}

export async function POST(req: Request) {

    const json = await req.json();

    const contact: NewsletterContact = json.contact;
    const utm: NewsletterUTM = json.utm;

    if (!contact.email) {
        return NextResponse.json({ error: "invalid email" }, { status: 400 });
    }

    const client = new BeehiivClient({ token: BEEHIIV_API_KEY });
    try {
        await client.subscriptions.create("pub_f761160d-d22f-4532-9e0c-6f58a06724b7", {
            email: contact.email,
            reactivate_existing: true,
            send_welcome_email: false,
            utm_source: utm.source, // 'google', 'facebook', 'website', 'partner-website' etc.
            utm_medium: utm.medium, // 'cpc (cost-per-click)', 'email', 'social', 'banner', 'qr_code', etc.
            utm_campaign: utm.campaign, // 'solana_summer_2025_promo', 'autumn_semester_promo', etc.
            referring_site: "www.monark.io",
            custom_fields: [{
                name: "First Name",
                value: contact.first_name
            }, {
                name: "Last Name",
                value: contact.last_name
            }],
        });
        return NextResponse.json(
            { status: "ok", message: "Subscribed", email: contact.email },
            { status: 200 });
    } catch (err) {
        if (err instanceof BeehiivError) {
            console.log(err.statusCode);
            console.log(err.message);
            console.log(err.body);
            console.log(err.rawResponse);
            return NextResponse.json({ error: err.message }, { status: err.statusCode });
        }
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
