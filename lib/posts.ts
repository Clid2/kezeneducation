/**
 * Blog Post Storage — JSON file implementation
 * Same pattern as db.ts (leads). On Vercel uses /tmp (ephemeral).
 * For production persistence, migrate to Supabase or similar.
 */

import fs from "fs";
import path from "path";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;       // Markdown-like: paragraphs separated by \n\n, ## for h2, **bold**
  category: "SAT" | "IELTS" | "Strategy";
  color: "blue" | "green" | "slate";
  readTime: string;
  date: string;          // "Мар 2026"
  dateIso: string;       // "2026-03-15" for sorting
  published: boolean;
  author: string;
}

function getDbPath(): string {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return path.join("/tmp", "posts.json");
  }
  return path.join(process.cwd(), "data", "posts.json");
}

const INITIAL_POSTS: Post[] = [
  {
    slug: "sat-1100-to-1400-in-4-months",
    title: "Как вырасти с 1100 до 1400 за 4 месяца",
    excerpt: "Точный план обучения и еженедельная структура для студентов, нацеленных на прирост 300+ баллов.",
    content: `## С чего начать

Прирост в 300 баллов за 4 месяца — это реально, если подойти к подготовке системно. Большинство студентов терпят неудачу не потому, что недостаточно умны, а потому что занимаются хаотично: решают задачи без анализа ошибок, пропускают слабые темы, не отслеживают прогресс.

## Месяц 1: Диагностика и основы

Первый месяц полностью посвящён пониманию своего текущего уровня. Пройдите полноформатный пробный тест CollegeBoard в реальных условиях. Запишите каждую ошибку в базу ошибок. Разделите все темы на три категории: знаю хорошо, знаю частично, не знаю совсем.

**Цель месяца:** понять свои слабые места и построить персональный план.

## Месяц 2: Работа с ошибками

Теперь вы знаете своих врагов. Уделяйте 70% времени темам из третьей категории. Не переходите к новой теме, пока не решите 20 задач по текущей теме без ошибок.

**Math:** начните с алгебры (линейные уравнения, системы), затем функции, геометрия, продвинутая математика.
**Reading & Writing:** работайте над типами вопросов: Words in Context, Text Structure, Command of Evidence.

## Месяц 3: Пробные тесты и скорость

Еженедельный полноформатный тест обязателен. После каждого теста: 2 часа на разбор ошибок, не меньше. Начинайте работать со временем — большинство студентов теряют баллы из-за нехватки времени, а не знаний.

## Месяц 4: Шлифовка

Финальный месяц — это тонкая настройка. Нет смысла учить новые темы. Закрепляйте то, что знаете. Делайте 2 полных теста в неделю. Работайте над психологией экзамена: дыхание, стратегия пропуска сложных вопросов.

## Итог

Системность важнее интенсивности. Лучше 2 часа осознанной работы с анализом ошибок, чем 5 часов хаотичного решения задач.`,
    category: "SAT",
    color: "blue",
    readTime: "7",
    date: "Мар 2025",
    dateIso: "2025-03-01",
    published: true,
    author: "Команда Kezen",
  },
  {
    slug: "ielts-writing-task-2-structure",
    title: "IELTS Writing Task 2: Структура из 5 абзацев",
    excerpt: "Проверенная структура, которая помогает стабильно получать Band 7 и выше в каждом эссе.",
    content: `## Почему структура решает всё

Экзаменаторы IELTS проверяют четыре критерия: Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range. Структура напрямую влияет на первые два критерия — вместе они дают 50% итогового балла.

## Структура эссе Band 7+

**Абзац 1: Введение (2–3 предложения)**
Перефразируйте тему своими словами. Не копируйте формулировку из задания. Сразу обозначьте свою позицию.

**Абзац 2: Первый аргумент**
Topic sentence → объяснение → конкретный пример → мини-вывод. Один абзац = один аргумент.

**Абзац 3: Второй аргумент**
Та же структура. Используйте linking words: Furthermore, In addition, Moreover.

**Абзац 4: Контраргумент + опровержение**
Признайте противоположную точку зрения (однако это делает ваш аргумент сильнее). Затем опровергните её: "However, this argument overlooks the fact that..."

**Абзац 5: Заключение (2–3 предложения)**
Кратко резюмируйте оба аргумента. Повторите свою позицию другими словами. Не вводите новых идей.

## Типичные ошибки

**Слишком длинное введение.** Вступление должно быть кратким. Экзаменатор ищет вашу позицию, а не пересказ задания.

**Нет конкретных примеров.** "Many people believe..." — это не пример. Приведите исследование, страну, историческое событие или личный опыт.

**Слабые linking words.** "Also" и "And" — это не академический стиль. Используйте: Nevertheless, Consequently, As a result, In contrast.

## Целевой объём

250–290 слов. Больше — не значит лучше. Экзаменаторы ценят точность, а не многословие.`,
    category: "IELTS",
    color: "green",
    readTime: "5",
    date: "Фев 2025",
    dateIso: "2025-02-01",
    published: true,
    author: "Команда Kezen",
  },
  {
    slug: "sat-math-top-10-algebra-concepts",
    title: "SAT Math: 10 самых проверяемых концепций алгебры",
    excerpt: "Мы проанализировали 50 пробных тестов SAT и выявили самые часто встречающиеся темы.",
    content: `## Как мы это выяснили

Команда Kezen проанализировала 50 официальных пробных тестов SAT и подсчитала частоту появления каждой алгебраической темы. Результаты оказались предсказуемыми — SAT очень повторяем, если знать, на что смотреть.

## Топ-10 концепций

**1. Линейные уравнения и неравенства** — появляются в каждом тесте, 4–6 задач. Нужно уметь решать их быстро, без ошибок.

**2. Системы уравнений** — 3–4 задачи. Знайте оба метода: подстановка и сложение/вычитание. CollegeBoard любит задачи, где один метод намного быстрее другого.

**3. Линейные функции (slope, y-intercept)** — интерпретация графиков и уравнений в контексте реальных задач.

**4. Квадратные уравнения** — дискриминант, факторизация, формула корней. Знайте все три метода.

**5. Функции: f(x), g(f(x))** — композиция функций появляется стабильно в каждом тесте.

**6. Показательный рост и убывание** — y = a·bˣ. Нужно уметь читать эти формулы в контексте.

**7. Абсолютные значения** — |x - 3| = 5 и неравенства с абсолютными значениями.

**8. Полиномы: умножение и деление** — (x+2)(x-3) и деление на (x-a).

**9. Рациональные уравнения** — дроби с переменными в знаменателе.

**10. Параболы: вершина и пересечения** — vertex form vs standard form.

## Стратегия работы с этим списком

Не пытайтесь охватить всё за раз. Пройдите диагностический тест, найдите свои 3 слабые темы из этого списка — и проработайте их первыми. Это даст максимальный прирост баллов за минимальное время.`,
    category: "SAT",
    color: "blue",
    readTime: "6",
    date: "Янв 2025",
    dateIso: "2025-01-15",
    published: true,
    author: "Команда Kezen",
  },
];

function ensureFile(): void {
  const dbPath = getDbPath();
  const dir = path.dirname(dbPath);
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify(INITIAL_POSTS, null, 2), "utf-8");
    }
  } catch {
    // ignore
  }
}

export function getAllPosts(includeUnpublished = false): Post[] {
  ensureFile();
  try {
    const raw = fs.readFileSync(getDbPath(), "utf-8");
    const posts = JSON.parse(raw) as Post[];
    const filtered = includeUnpublished ? posts : posts.filter((p) => p.published);
    return filtered.sort((a, b) => b.dateIso.localeCompare(a.dateIso));
  } catch {
    return INITIAL_POSTS.filter((p) => includeUnpublished || p.published);
  }
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts(true);
  return posts.find((p) => p.slug === slug) ?? null;
}

export function savePost(post: Post): void {
  ensureFile();
  const posts = getAllPosts(true);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = post;
  } else {
    posts.unshift(post);
  }
  fs.writeFileSync(getDbPath(), JSON.stringify(posts, null, 2), "utf-8");
}

export function deletePost(slug: string): void {
  ensureFile();
  const posts = getAllPosts(true).filter((p) => p.slug !== slug);
  fs.writeFileSync(getDbPath(), JSON.stringify(posts, null, 2), "utf-8");
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => {
      const map: Record<string, string> = {
        а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"zh",з:"z",и:"i",й:"y",
        к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",
        х:"kh",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya",
      };
      return map[c] ?? c;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
