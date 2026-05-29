import Link from "next/link";
import {
  findTopicBySlug,
  getProblemsForTopic,
  type RoadmapSection,
  type TopicNode,
} from "@/app/_data/roadmap";
import { StatusBadge, StatusDot } from "@/app/_components/status";

function prerequisiteTitle(slug: string) {
  return findTopicBySlug(slug)?.title ?? slug;
}

function TopicCard({ node, depth = 0 }: { node: TopicNode; depth?: number }) {
  const problems = getProblemsForTopic(node.slug);
  const isLocked = node.status === "locked";
  const hasChildren = Boolean(node.children?.length);

  return (
    <li className="relative pl-5">
      <span
        aria-hidden="true"
        className="absolute left-0 top-5 h-full w-px bg-slate-200 last:hidden"
      />
      <article
        className={`relative rounded-lg border bg-white p-4 shadow-sm transition hover:border-slate-300 ${
          isLocked ? "border-slate-200 opacity-80" : "border-slate-300"
        }`}
      >
        <span
          aria-hidden="true"
          className="absolute -left-5 top-5 h-px w-5 bg-slate-200"
        />
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <StatusDot status={node.status} />
              <h3
                className={`font-semibold text-slate-950 ${
                  depth === 0 ? "text-lg" : "text-base"
                }`}
              >
                {node.title}
              </h3>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{node.summary}</p>
          </div>
          <StatusBadge status={node.status} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
          {node.problemTypes.map((type) => (
            <span key={type} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
              {type}
            </span>
          ))}
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
            {node.estimatedMinutes} min
          </span>
          {hasChildren ? (
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
              {node.children?.length} child nodes
            </span>
          ) : null}
        </div>

        {node.prerequisiteSlugs?.length ? (
          <div className="mt-3 text-xs leading-5 text-slate-500">
            Unlocks after{" "}
            <span className="font-semibold text-slate-700">
              {node.prerequisiteSlugs.map(prerequisiteTitle).join(", ")}
            </span>
          </div>
        ) : null}

        {node.commonTraps?.length ? (
          <div className="mt-4 grid gap-2 border-t border-slate-100 pt-3 sm:grid-cols-3">
            {node.commonTraps.map((trap) => (
              <p key={trap} className="rounded-md bg-rose-50 px-3 py-2 text-xs leading-5 text-rose-950">
                {trap}
              </p>
            ))}
          </div>
        ) : null}

        {problems.length ? (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
            {problems.map((problem) => (
              <Link
                key={problem.slug}
                href={`/problems/${problem.slug}`}
                className="inline-flex min-h-9 items-center rounded-md border border-slate-300 bg-slate-950 px-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
              >
                {problem.id}
              </Link>
            ))}
          </div>
        ) : null}
      </article>

      {hasChildren ? (
        <ol className="mt-3 space-y-3">
          {node.children?.map((child) => (
            <TopicCard key={child.slug} node={child} depth={depth + 1} />
          ))}
        </ol>
      ) : null}
    </li>
  );
}

export function RoadmapTree({ sections }: { sections: RoadmapSection[] }) {
  return (
    <div className="space-y-5">
      {sections.map((section) => (
        <section key={section.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className={`rounded-lg border-l-4 p-4 ${section.accent}`}>
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Section {section.code}</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">{section.title}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 opacity-80">{section.summary}</p>
          </div>
          <ol className="mt-4 space-y-3">
            {section.children.map((node) => (
              <TopicCard key={node.slug} node={node} />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
