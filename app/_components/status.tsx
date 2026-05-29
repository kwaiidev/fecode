import type { ProblemStatus, TopicStatus } from "@/app/_data/roadmap";

const statusLabels: Record<TopicStatus | ProblemStatus, string> = {
  available: "Open",
  locked: "Locked",
  "not-started": "Not started",
  attempted: "Attempted",
  solved: "Solved",
  mastered: "Mastered",
  "needs-review": "Needs review",
};

const statusClasses: Record<TopicStatus | ProblemStatus, string> = {
  available: "border-emerald-200 bg-emerald-50 text-emerald-800",
  locked: "border-zinc-200 bg-zinc-100 text-zinc-500",
  "not-started": "border-slate-200 bg-white text-slate-600",
  attempted: "border-sky-200 bg-sky-50 text-sky-800",
  solved: "border-teal-200 bg-teal-50 text-teal-800",
  mastered: "border-amber-200 bg-amber-50 text-amber-800",
  "needs-review": "border-rose-200 bg-rose-50 text-rose-800",
};

export function StatusBadge({ status }: { status: TopicStatus | ProblemStatus }) {
  return (
    <span
      className={`inline-flex h-6 shrink-0 items-center rounded-md border px-2 text-xs font-semibold ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export function StatusDot({ status }: { status: TopicStatus | ProblemStatus }) {
  const dotClasses: Record<TopicStatus | ProblemStatus, string> = {
    available: "bg-emerald-500",
    locked: "bg-zinc-300",
    "not-started": "bg-slate-300",
    attempted: "bg-sky-500",
    solved: "bg-teal-500",
    mastered: "bg-amber-500",
    "needs-review": "bg-rose-500",
  };

  return <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${dotClasses[status]}`} />;
}
