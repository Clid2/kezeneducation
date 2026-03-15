import { createClient } from "@supabase/supabase-js";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  message: string;
  locale: string;
  createdAt: string;
}

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars not set");
  return createClient(url, key);
}

export async function saveLead(data: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const lead: Lead = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };

  const { error } = await getClient()
    .from("leads")
    .insert({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      program: lead.program,
      message: lead.message,
      locale: lead.locale,
      created_at: lead.createdAt,
    });

  if (error) throw new Error(error.message);
  return lead;
}

export async function getAllLeads(): Promise<Lead[]> {
  const { data, error } = await getClient()
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    program: row.program ?? "",
    message: row.message ?? "",
    locale: row.locale ?? "ru",
    createdAt: row.created_at,
  }));
}