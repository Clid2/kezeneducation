import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import PostPageClient from "./PostPageClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts(false);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post || !post.published) notFound();
  return <PostPageClient post={post} />;
}
