import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/db";
import { sendTelegramNotification } from "@/lib/telegram";

/**
 * POST /api/leads
 * Saves a contact form submission as a lead.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ----- Validation -----
    const errors: string[] = [];

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const program = String(body.program || "").trim();
    const message = String(body.message || "").trim();
    const locale = String(body.locale || "ru").trim();

    if (!name || name.length < 2) {
      errors.push("Name is required (min 2 characters).");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("A valid email address is required.");
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // ----- Save lead -----
    const lead = saveLead({ name, email, phone, program, message, locale });

    // ----- Telegram notification -----
    // ----- Telegram notification -----
try {
  await sendTelegramNotification(lead);
} catch (err) {
  console.error("[Telegram] Notification error:", err);
}
    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[/api/leads] Error saving lead:", err);
    return NextResponse.json(
      { success: false, errors: ["Internal server error. Please try again."] },
      { status: 500 }
    );
  }
}

/**
 * GET /api/leads
 * Returns all stored leads (for internal review).
 * IMPORTANT: In production, protect this route with authentication.
 */
export async function GET() {
  try {
    const { getAllLeads } = await import("@/lib/db");
    const leads = getAllLeads();
    return NextResponse.json({ leads, count: leads.length });
  } catch (err) {
    console.error("[/api/leads] Error fetching leads:", err);
    return NextResponse.json({ leads: [], count: 0 }, { status: 500 });
  }
}