import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug, savePost, deletePost } from "@/lib/posts";
import type { Post } from "@/lib/posts";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("x-admin-password") === ADMIN_PASSWORD;
}

// GET /api/posts/[slug] — single post (public)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

// PUT /api/posts/[slug] — update post (admin)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const existing = getPostBySlug(slug);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const colorMap: Record<string, "blue" | "green" | "slate"> = {
      SAT: "blue", IELTS: "green", Strategy: "slate",
    };
    const updated: Post = {
      ...existing,
      title: body.title?.trim() ?? existing.title,
      excerpt: body.excerpt?.trim() ?? existing.excerpt,
      content: body.content?.trim() ?? existing.content,
      category: body.category ?? existing.category,
      color: colorMap[body.category ?? existing.category] ?? existing.color,
      readTime: body.readTime ?? existing.readTime,
      published: body.published !== undefined ? body.published : existing.published,
      author: body.author?.trim() ?? existing.author,
    };

    savePost(updated);
    return NextResponse.json({ success: true, post: updated });
  } catch (err) {
    console.error("[/api/posts/slug] PUT error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/posts/[slug] — delete post (admin)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const existing = getPostBySlug(slug);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  deletePost(slug);
  return NextResponse.json({ success: true });
}