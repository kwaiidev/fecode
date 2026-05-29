import Link from "next/link";
import { RoadmapGraph } from "@/app/_components/roadmap-graph";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1f2225] text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-700 bg-[#30343a]/95 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 font-black text-amber-400">
              FE
            </Link>
            <a className="rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white" href="#roadmap">
              Roadmap
            </a>
          </div>
        </nav>
      </header>

      <div className="mx-auto w-full max-w-[1320px] px-4 py-6 sm:px-6 lg:px-8">
        <div id="roadmap" className="min-w-0">
          <RoadmapGraph />
        </div>
      </div>
    </main>
  );
}
