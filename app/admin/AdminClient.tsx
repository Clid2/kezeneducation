"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus, Trash2, Edit2, Eye, EyeOff, Save, X,
  LogIn, ArrowLeft, CheckCircle2, AlertCircle, ExternalLink,
} from "lucide-react";
import type { Post } from "@/lib/posts";

// ─── Types ────────────────────────────────────────────────────────────────────
type View = "login" | "list" | "editor";

const EMPTY_FORM: Omit<Post, "dateIso" | "date" | "color"> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "SAT",
  readTime: "5",
  published: true,
  author: "Команда Kezen",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function slugify(title: string): string {
  const map: Record<string, string> = {
    а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"zh",з:"z",и:"i",й:"y",
    к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",
    х:"kh",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya",
  };
  return title.toLowerCase()
    .replace(/[а-яё]/g, (c) => map[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const catColor: Record<string, string> = {
  SAT: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  IELTS: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Strategy: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function Alert({ type, msg }: { type: "ok" | "err"; msg: string }) {
  return (
    <div className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl border ${
      type === "ok"
        ? "bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300"
        : "bg-red-50 border-red-100 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
    }`}>
      {type === "ok" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
      {msg}
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all";
const labelCls = "block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminClient() {
  const [view, setView] = useState<View>("login");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [storedPw, setStoredPw] = useState("");

  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // ── Auth ──
  const handleLogin = () => {
    if (!password.trim()) { setAuthError("Введите пароль"); return; }
    // Quick pre-check — real check happens on API calls
    setStoredPw(password.trim());
    setView("list");
    setAuthError("");
  };

  // ── Fetch posts ──
  const fetchPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      // Fetch all including unpublished via admin header
      const res = await fetch("/api/posts?all=1", {
        headers: { "x-admin-password": storedPw },
      });
      const data = await res.json();
      if (res.status === 401) { setView("login"); setAuthError("Неверный пароль"); return; }
      setPosts(data.posts ?? []);
    } catch {
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  }, [storedPw]);

  useEffect(() => {
    if (view === "list") fetchPosts();
  }, [view, fetchPosts]);

  // ── Open editor ──
  const openNew = () => {
    setIsNew(true);
    setEditingPost(null);
    setForm({ ...EMPTY_FORM });
    setFeedback(null);
    setView("editor");
  };

  const openEdit = (post: Post) => {
    setIsNew(false);
    setEditingPost(post);
    setForm({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readTime: post.readTime,
      published: post.published,
      author: post.author,
    });
    setFeedback(null);
    setView("editor");
  };

  // ── Save ──
  const handleSave = async () => {
    if (!form.title.trim()) { setFeedback({ type: "err", msg: "Заголовок обязателен" }); return; }
    if (!form.content.trim() || form.content.trim().length < 50) {
      setFeedback({ type: "err", msg: "Контент слишком короткий (мин. 50 символов)" }); return;
    }
    if (!form.excerpt.trim()) { setFeedback({ type: "err", msg: "Краткое описание обязательно" }); return; }

    setSaving(true);
    setFeedback(null);

    const slug = form.slug.trim() || slugify(form.title);

    try {
      const url = isNew ? "/api/posts" : `/api/posts/${editingPost!.slug}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-password": storedPw },
        body: JSON.stringify({ ...form, slug }),
      });
      const data = await res.json();

      if (res.status === 401) { setView("login"); setAuthError("Сессия истекла. Войдите снова."); return; }
      if (!res.ok) { setFeedback({ type: "err", msg: data.error ?? "Ошибка сохранения" }); return; }

      setFeedback({ type: "ok", msg: isNew ? "Статья опубликована!" : "Изменения сохранены!" });
      setTimeout(() => { setView("list"); }, 1200);
    } catch {
      setFeedback({ type: "err", msg: "Ошибка сети. Попробуйте ещё раз." });
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle publish ──
  const togglePublish = async (post: Post) => {
    await fetch(`/api/posts/${post.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-password": storedPw },
      body: JSON.stringify({ published: !post.published }),
    });
    fetchPosts();
  };

  // ── Delete ──
  const handleDelete = async (slug: string) => {
    await fetch(`/api/posts/${slug}`, {
      method: "DELETE",
      headers: { "x-admin-password": storedPw },
    });
    setDeleteConfirm(null);
    fetchPosts();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: Login
  // ─────────────────────────────────────────────────────────────────────────────
  if (view === "login") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-black text-lg">K</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-950 dark:text-white">Панель администратора</h1>
            <p className="text-sm text-slate-400 mt-1">Управление блогом Kezen</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8 shadow-card">
            <label className={labelCls}>Пароль</label>
            <input
              type="password"
              className={inputCls}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {authError && <p className="text-xs text-red-500 mt-2">{authError}</p>}
            <button
              onClick={handleLogin}
              className="mt-5 w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <LogIn size={15} /> Войти
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            Пароль по умолчанию: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">kezen-admin-2026</code>
            <br />Измените его через переменную <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">ADMIN_PASSWORD</code>
          </p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: Editor
  // ─────────────────────────────────────────────────────────────────────────────
  if (view === "editor") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Назад
          </button>
          <h2 className="font-semibold text-navy-950 dark:text-white text-sm">
            {isNew ? "Новая статья" : "Редактировать статью"}
          </h2>
          <div className="flex items-center gap-2">
            {!isNew && editingPost && (
              <Link
                href={`/blog/${editingPost.slug}`}
                target="_blank"
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors"
              >
                <ExternalLink size={12} /> Открыть
              </Link>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save size={14} />
              {saving ? "Сохраняю..." : "Сохранить"}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {feedback && <Alert type={feedback.type} msg={feedback.msg} />}

          {/* Row 1: Title */}
          <div>
            <label className={labelCls}>Заголовок *</label>
            <input
              className={inputCls + " text-base font-medium"}
              placeholder="Как вырасти с 1100 до 1400 за 4 месяца"
              value={form.title}
              onChange={(e) => {
                const t = e.target.value;
                setForm((f) => ({ ...f, title: t, slug: f.slug || slugify(t) }));
              }}
            />
          </div>

          {/* Row 2: Slug + Category + ReadTime */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>URL slug</label>
              <input
                className={inputCls}
                placeholder="auto-from-title"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelCls}>Категория *</label>
              <select
                className={inputCls}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Post["category"] }))}
              >
                <option value="SAT">SAT</option>
                <option value="IELTS">IELTS</option>
                <option value="Strategy">Стратегия</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Время чтения (мин)</label>
              <input
                type="number"
                min={1}
                max={60}
                className={inputCls}
                value={form.readTime}
                onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
              />
            </div>
          </div>

          {/* Row 3: Author + Published */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Автор</label>
              <input
                className={inputCls}
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.published ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${form.published ? "translate-x-5" : ""}`} />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {form.published ? "Опубликована" : "Черновик"}
                </span>
              </label>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className={labelCls}>Краткое описание * <span className="normal-case font-normal text-slate-400">(показывается в карточке)</span></label>
            <textarea
              rows={2}
              className={inputCls + " resize-none"}
              placeholder="Проверенная структура, которая помогает стабильно получать Band 7..."
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            />
          </div>

          {/* Content */}
          <div>
            <label className={labelCls}>
              Контент статьи *{" "}
              <span className="normal-case font-normal text-slate-400">
                — <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">## Заголовок</code>{" "}
                <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">**жирный**</code>{" "}
                — пустая строка = новый абзац
              </span>
            </label>
            <textarea
              rows={24}
              className={inputCls + " resize-y font-mono text-sm leading-relaxed"}
              placeholder={`## С чего начать\n\nПрирост в 300 баллов за 4 месяца — это реально...\n\n## Месяц 1: Диагностика\n\n**Важно:** начните с пробного теста...`}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            />
            <p className="text-xs text-slate-400 mt-2">
              {form.content.trim().split(/\s+/).filter(Boolean).length} слов · примерно {Math.ceil(form.content.trim().split(/\s+/).filter(Boolean).length / 200)} мин чтения
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: List
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">K</span>
          </div>
          <h1 className="font-bold text-navy-950 dark:text-white">Блог — Панель администратора</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/blog" target="_blank" className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
            <ExternalLink size={12} /> Блог
          </Link>
          <button
            onClick={openNew}
            className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={14} /> Новая статья
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {loadingPosts ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 mb-4">Статей пока нет.</p>
            <button onClick={openNew} className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors mx-auto">
              <Plus size={14} /> Создать первую статью
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-4">{posts.length} {posts.length === 1 ? "статья" : "статей"}</p>
            {posts.map((post) => (
              <div
                key={post.slug}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm px-5 py-4 flex items-center gap-4"
              >
                {/* Status dot */}
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${post.published ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catColor[post.category] ?? catColor.Strategy}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.date}</span>
                    {!post.published && (
                      <span className="text-xs text-slate-400 italic">черновик</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-navy-950 dark:text-white truncate">{post.title}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">/blog/{post.slug}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => togglePublish(post)}
                    title={post.published ? "Снять с публикации" : "Опубликовать"}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    {post.published ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Открыть статью"
                  >
                    <ExternalLink size={15} />
                  </Link>
                  <button
                    onClick={() => openEdit(post)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Редактировать"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(post.slug)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Удалить"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-navy-950 dark:text-white mb-2">Удалить статью?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Это действие нельзя отменить. Статья <code className="text-red-500 text-xs">{deleteConfirm}</code> будет удалена навсегда.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={14} /> Отмена
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-red-700 transition-colors"
              >
                <Trash2 size={14} /> Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
