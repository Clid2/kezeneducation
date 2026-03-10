/**
 * Lead Storage — JSON file implementation
 *
 * For LOCAL DEV / MVP: stores leads in /data/leads.json
 *
 * IMPORTANT FOR VERCEL DEPLOYMENT:
 * Vercel's serverless filesystem is read-only in production.
 * For production, upgrade to one of:
 *   - Supabase (https://supabase.com) — free tier available
 *   - PlanetScale MySQL
 *   - Neon Serverless Postgres
 *   - MongoDB Atlas
 *
 * To upgrade: replace the functions below with database client calls.
 * The Lead interface and function signatures remain the same.
 */

import fs from "fs";
import path from "path";

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

// In Vercel production, write to /tmp (ephemeral but functional for demos)
// For real persistence, use a database
function getDbPath(): string {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return path.join("/tmp", "leads.json");
  }
  return path.join(process.cwd(), "data", "leads.json");
}

function ensureFile(): void {
  const dbPath = getDbPath();
  const dir = path.dirname(dbPath);
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, "[]", "utf-8");
    }
  } catch {
    // ignore in edge cases
  }
}

export function getAllLeads(): Lead[] {
  ensureFile();
  try {
    const raw = fs.readFileSync(getDbPath(), "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export function saveLead(
  data: Omit<Lead, "id" | "createdAt">
): Lead {
  ensureFile();
  const leads = getAllLeads();

  const newLead: Lead = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };

  leads.push(newLead);

  try {
    fs.writeFileSync(getDbPath(), JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write lead to file:", err);
    throw err;
  }

  return newLead;
}
