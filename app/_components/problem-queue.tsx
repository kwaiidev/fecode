import Link from "next/link";
import type { ProblemRecord } from "@/app/_data/roadmap";
import { StatusBadge } from "@/app/_components/status";

export function ProblemQueue({ problems }: { problems: ProblemRecord[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
            Practice Slots
          </h2>
          <p className="mt-1 text-sm text-slate-600">{problems.length} editable records</p>
        </div>
        <span className="self-center rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-bold text-amber-900">
          Manual seed
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-white text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Problem</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Category</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Type</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Time</th>
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.slug} className="align-top">
                <td className="border-b border-slate-100 px-4 py-3">
                  <Link
                    href={`/problems/${problem.slug}`}
                    className="font-semibold text-slate-950 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {problem.title}
                  </Link>
                  <p className="mt-1 text-xs font-medium text-slate-500">{problem.id}</p>
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-slate-600">
                  {problem.category}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-slate-600">
                  {problem.problemType}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-slate-600">
                  {problem.estimatedMinutes}m
                </td>
                <td className="border-b border-slate-100 px-4 py-3">
                  <StatusBadge status={problem.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
