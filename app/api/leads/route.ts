import { NextRequest, NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, retryAfter } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { success: false, errors: [`Слишком много запросов. Попробуйте через ${retryAfter} сек.`] },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    const errors: string[] = [];
    const name    = String(body.name    || "").trim();
    const email   = String(body.email   || "").trim().toLowerCase();
    const phone   = String(body.phone   || "").trim();
    const program = String(body.program || "").trim();
    const message = String(body.message || "").trim();
    const locale  = String(body.locale  || "ru").trim();

    if (!name || name.length < 2) errors.push("Name is required (min 2 characters).");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email address is required.");
    if (errors.length > 0) return NextResponse.json({ success: false, errors }, { status: 422 });

    const lead = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name, email, phone, program, message, locale,
      createdAt: new Date().toISOString(),
    };

    // Try Supabase if configured
    try {
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_ANON_KEY;
      if (url && key) {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(url, key);
        await supabase.from("leads").insert({
          id: lead.id, name, email, phone, program, message, locale,
          created_at: lead.createdAt,
        });
      }
    } catch (dbErr) {
      console.error("[Supabase] Error:", dbErr);
      // non-fatal — continue to Telegram
    }

    // Always try Telegram
    try {
      await sendTelegramNotification(lead);
    } catch (err) {
      console.error("[Telegram] Error:", err);
    }

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });

  } catch (err) {
    console.error("[/api/leads] Error:", err);
    return NextResponse.json(
      { success: false, errors: ["Internal server error. Please try again."] },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const provided = request.headers.get("x-admin-password");
  if (!adminPassword || provided !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { getAllLeads } = await import("@/lib/db");
    const leads = await getAllLeads();
    return NextResponse.json({ leads, count: leads.length });
  } catch (err) {
    console.error("[/api/leads] Error fetching leads:", err);
    return NextResponse.json({ leads: [], count: 0 }, { status: 500 });
  }
}