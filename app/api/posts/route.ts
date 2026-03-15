import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, savePost, slugify } from "@/lib/posts";
import type { Post } from "@/lib/posts";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "от одного до девяти жб";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-password");
  return auth === ADMIN_PASSWORD;
}

// GET /api/posts — published posts (or all with admin header + ?all=1)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "1" && checkAuth(req);
    const posts = getAllPosts(all);
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}

// POST /api/posts — create a new post (admin only)
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const errors: string[] = [];
    if (!body.title || String(body.title).trim().length < 5) errors.push("Заголовок обязателен (мин. 5 символов).");
    if (!body.content || String(body.content).trim().length < 50) errors.push("Контент обязателен (мин. 50 символов).");
    if (!body.excerpt || String(body.excerpt).trim().length < 10) errors.push("Краткое описание обязательно.");
    if (!["SAT", "IELTS", "Strategy"].includes(body.category)) errors.push("Категория должна быть SAT, IELTS или Strategy.");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
    }

    const now = new Date();
    const months = ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];
    const dateDisplay = `${months[now.getMonth()]} ${now.getFullYear()}`;
    const dateIso = now.toISOString().slice(0, 10);

    const colorMap: Record<string, "blue" | "green" | "slate"> = {
      SAT: "blue", IELTS: "green", Strategy: "slate",
    };

    const rawSlug = body.slug?.trim() || body.title;
    const slug = slugify(rawSlug);

    const post: Post = {
      slug,
      title: String(body.title).trim(),
      excerpt: String(body.excerpt).trim(),
      content: String(body.content).trim(),
      category: body.category,
      color: colorMap[body.category] ?? "slate",
      readTime: String(body.readTime ?? "5"),
      date: dateDisplay,
      dateIso,
      published: body.published !== false,
      author: body.author?.trim() || "Команда Kezen",
    };

    savePost(post);
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (err) {
    console.error("[/api/posts] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
