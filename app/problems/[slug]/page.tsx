import Link from "next/link";
import { notFound } from "next/navigation";
import {
  findTopicBySlug,
  getProblemBySlug,
  getProblemNeighbors,
  problemBank,
} from "@/app/_data/roadmap";
import { StatusBadge } from "@/app/_components/status";

export function generateStaticParams() {
  return problemBank.map((problem) => ({
    slug: problem.slug,
  }));
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  const topic = findTopicBySlug(problem.topicSlug);
  const neighbors = getProblemNeighbors(problem.slug);
  const totalPoints = problem.rubric.reduce((total, row) => total + row.points, 0);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
          <Link
            href="/"
            className="font-semibold text-slate-700 underline-offset-4 hover:text-slate-950 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            Roadmap
          </Link>
          <div className="flex flex-wrap gap-2">
            {neighbors.previous ? (
              <Link
                href={`/problems/${neighbors.previous.slug}`}
                className="rounded-md border border-slate-300 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                Previous
              </Link>
            ) : null}
            {neighbors.next ? (
              <Link
                href={`/problems/${neighbors.next.slug}`}
                className="rounded-md border border-slate-300 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                Next
              </Link>
            ) : null}
          </div>
        </nav>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="min-w-0 rounded-lg border border-slate-200 bg-white shadow-sm">
            <header className="border-b border-slate-200 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-900">
                  {problem.id}
                </span>
                <StatusBadge status={problem.status} />
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">
                  {problem.difficulty}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">
                  {problem.problemType}
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                {problem.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                {problem.category}
                {topic ? ` / ${topic.trail.join(" / ")} / ${topic.title}` : null}
              </p>
            </header>

            <div className="grid gap-5 p-5">
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
                  Prompt
                </h2>
                <p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-base leading-7 text-slate-700 break-words">
                  {problem.prompt}
                </p>
              </section>

              {problem.starterCode ? (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
                    Starter Code
                  </h2>
                  <pre className="mt-3 max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-100">
                    <code className="break-words">{problem.starterCode}</code>
                  </pre>
                </section>
              ) : null}

              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
                  Attempt
                </h2>
                <textarea
                  aria-label="Attempt notes"
                  className="mt-3 min-h-52 w-full resize-y rounded-lg border border-slate-300 bg-white p-4 font-mono text-sm leading-6 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="Work through the trace, proof, or C-like solution here."
                />
              </section>

              <section className="grid gap-3">
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
                  Hints
                </h2>
                {problem.hints.map((hint, index) => (
                  <details
                    key={hint}
                    className="rounded-lg border border-slate-200 bg-white p-4 open:bg-slate-50"
                  >
                    <summary className="cursor-pointer text-sm font-semibold text-slate-800">
                      Hint {index + 1}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{hint}</p>
                  </details>
                ))}
              </section>

              <details className="rounded-lg border border-slate-300 bg-white p-4 open:bg-emerald-50">
                <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
                  Solution
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{problem.solution}</p>
              </details>
            </div>
          </article>

          <aside className="flex min-w-0 flex-col gap-5 lg:sticky lg:top-5 lg:self-start">
            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
                Rubric
              </h2>
              <p className="mt-2 text-sm text-slate-600">{totalPoints} points</p>
              <div className="mt-4 divide-y divide-slate-100">
                {problem.rubric.map((row) => (
                  <div key={row.label} className="grid grid-cols-[auto_1fr] gap-3 py-3">
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm font-bold text-slate-900">
                      {row.points}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{row.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{row.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
                Metadata
              </h2>
              <dl className="mt-4 grid gap-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-500">Estimated time</dt>
                  <dd className="mt-1 text-slate-900">{problem.estimatedMinutes} minutes</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Exam term</dt>
                  <dd className="mt-1 text-slate-900">{problem.examTerm}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Source</dt>
                  <dd className="mt-1 text-slate-900">{problem.source.label}</dd>
                  <dd className="mt-1 text-xs leading-5 text-slate-500">{problem.source.detail}</dd>
                </div>
              </dl>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
