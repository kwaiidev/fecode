import Link from "next/link";

type GraphNode = {
  id: string;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  status: "open" | "locked" | "checkpoint";
  href?: string;
};

type GraphEdge = {
  from: string;
  to: string;
};

const graphNodes: GraphNode[] = [
  {
    id: "foundation",
    title: "FE Foundation",
    subtitle: "Start",
    x: 426,
    y: 24,
    status: "open",
  },
  {
    id: "memory",
    title: "Dynamic Memory",
    subtitle: "C pointers",
    x: 230,
    y: 134,
    status: "open",
    href: "/problems/dynamic-memory-practice-slot",
  },
  {
    id: "analysis",
    title: "Algorithm Analysis",
    subtitle: "Big-O",
    x: 620,
    y: 134,
    status: "locked",
    href: "/problems/algorithm-analysis-practice-slot",
  },
  {
    id: "lists",
    title: "Linked Lists",
    subtitle: "Nodes",
    x: 70,
    y: 254,
    status: "locked",
    href: "/problems/linked-list-practice-slot",
  },
  {
    id: "stacks",
    title: "Stacks & Queues",
    subtitle: "ADTs",
    x: 270,
    y: 254,
    status: "locked",
    href: "/problems/stack-queue-practice-slot",
  },
  {
    id: "timing",
    title: "Timing Questions",
    subtitle: "Constants",
    x: 515,
    y: 254,
    status: "locked",
    href: "/problems/timing-question-practice-slot",
  },
  {
    id: "summations",
    title: "Summations",
    subtitle: "Recurrences",
    x: 750,
    y: 254,
    status: "locked",
    href: "/problems/summation-recurrence-practice-slot",
  },
  {
    id: "trees",
    title: "Binary Trees",
    subtitle: "Traversal",
    x: 60,
    y: 390,
    status: "locked",
    href: "/problems/binary-tree-practice-slot",
  },
  {
    id: "hashing",
    title: "Hash Tables",
    subtitle: "Collisions",
    x: 250,
    y: 390,
    status: "locked",
    href: "/problems/hash-heap-practice-slot",
  },
  {
    id: "heaps",
    title: "Binary Heaps",
    subtitle: "Priority",
    x: 430,
    y: 390,
    status: "locked",
    href: "/problems/hash-heap-practice-slot",
  },
  {
    id: "recursion",
    title: "Recursive Coding",
    subtitle: "Base cases",
    x: 620,
    y: 390,
    status: "locked",
    href: "/problems/recursive-coding-practice-slot",
  },
  {
    id: "sorting",
    title: "Sorting",
    subtitle: "Traces",
    x: 805,
    y: 390,
    status: "locked",
    href: "/problems/sorting-practice-slot",
  },
  {
    id: "avl",
    title: "AVL Trees",
    subtitle: "Rotations",
    x: 140,
    y: 526,
    status: "locked",
    href: "/problems/advanced-tree-practice-slot",
  },
  {
    id: "tries",
    title: "Tries",
    subtitle: "Prefixes",
    x: 330,
    y: 526,
    status: "locked",
    href: "/problems/advanced-tree-practice-slot",
  },
  {
    id: "base",
    title: "Base Conversion",
    subtitle: "2, 4, 8, 16",
    x: 550,
    y: 526,
    status: "locked",
    href: "/problems/base-bitwise-practice-slot",
  },
  {
    id: "bitwise",
    title: "Bitwise Operators",
    subtitle: "Subsets",
    x: 735,
    y: 526,
    status: "locked",
    href: "/problems/base-bitwise-practice-slot",
  },
  {
    id: "mock",
    title: "Mock FE Review",
    subtitle: "Checkpoint",
    x: 426,
    y: 670,
    status: "checkpoint",
  },
];

const graphEdges: GraphEdge[] = [
  { from: "foundation", to: "memory" },
  { from: "foundation", to: "analysis" },
  { from: "memory", to: "lists" },
  { from: "memory", to: "stacks" },
  { from: "analysis", to: "timing" },
  { from: "analysis", to: "summations" },
  { from: "lists", to: "trees" },
  { from: "stacks", to: "hashing" },
  { from: "stacks", to: "heaps" },
  { from: "timing", to: "recursion" },
  { from: "summations", to: "recursion" },
  { from: "summations", to: "sorting" },
  { from: "trees", to: "avl" },
  { from: "trees", to: "tries" },
  { from: "heaps", to: "tries" },
  { from: "recursion", to: "base" },
  { from: "recursion", to: "bitwise" },
  { from: "sorting", to: "bitwise" },
  { from: "avl", to: "mock" },
  { from: "tries", to: "mock" },
  { from: "base", to: "mock" },
  { from: "bitwise", to: "mock" },
];

const nodeById = new Map(graphNodes.map((node) => [node.id, node]));
const nodeWidth = 148;
const nodeHeight = 52;
const graphWidth = 1000;
const graphHeight = 780;

const mobileLevels = [
  ["foundation"],
  ["memory", "analysis"],
  ["lists", "stacks", "timing", "summations"],
  ["trees", "hashing", "heaps", "recursion", "sorting"],
  ["avl", "tries", "base", "bitwise"],
  ["mock"],
];

function edgePath(edge: GraphEdge) {
  const from = nodeById.get(edge.from);
  const to = nodeById.get(edge.to);

  if (!from || !to) {
    return "";
  }

  const startX = from.x + nodeWidth / 2;
  const startY = from.y + nodeHeight;
  const endX = to.x + nodeWidth / 2;
  const endY = to.y;
  const middleY = startY + (endY - startY) * 0.55;

  return `M ${startX} ${startY} C ${startX} ${middleY}, ${endX} ${middleY}, ${endX} ${endY}`;
}

function RoadmapNode({ node }: { node: GraphNode }) {
  const isLocked = node.status === "locked";
  const isCheckpoint = node.status === "checkpoint";
  const classes = [
    "absolute flex h-[52px] w-[148px] flex-col justify-center rounded-md border px-3 text-center shadow-lg transition",
    isLocked
      ? "border-slate-600 bg-slate-800 text-slate-300"
      : isCheckpoint
        ? "border-amber-300 bg-amber-500 text-slate-950 shadow-amber-950/30"
        : "border-blue-300 bg-blue-600 text-white shadow-blue-950/30",
    node.href ? "hover:-translate-y-0.5 hover:border-white focus:outline-none focus:ring-2 focus:ring-amber-300" : "",
  ].join(" ");

  const content = (
    <>
      <span className="truncate text-xs font-bold leading-4">{node.title}</span>
      <span
        className={`mt-1 h-1.5 rounded-full ${
          isLocked ? "bg-slate-600" : isCheckpoint ? "bg-slate-950/45" : "bg-white/80"
        }`}
      />
      <span className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.08em] opacity-80">
        {node.subtitle}
      </span>
    </>
  );

  if (node.href) {
    return (
      <Link
        href={node.href}
        className={classes}
        style={{ left: node.x, top: node.y }}
        aria-label={`${node.title} practice`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={classes} style={{ left: node.x, top: node.y }}>
      {content}
    </div>
  );
}

export function RoadmapGraph() {
  return (
    <section className="min-w-0 overflow-hidden rounded-lg border border-slate-700 bg-[#202326] shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-[#2b2e33] px-4 py-3">
        <div>
          <h1 className="text-base font-bold text-white">Foundation Exam Roadmap</h1>
          <p className="mt-1 text-sm text-slate-400">Start at the top, clear child topics, then unlock checkpoints.</p>
        </div>
        <div className="flex gap-2 text-xs font-semibold">
          <span className="rounded-md bg-blue-600 px-2 py-1 text-white">Open</span>
          <span className="rounded-md bg-slate-800 px-2 py-1 text-slate-300">Locked</span>
          <span className="rounded-md bg-amber-500 px-2 py-1 text-slate-950">Checkpoint</span>
        </div>
      </div>

      <div className="roadmap-scroll hidden overflow-auto sm:block">
        <div className="relative h-[780px] w-[1000px]">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${graphWidth} ${graphHeight}`}
            fill="none"
          >
            <defs>
              <marker
                id="roadmap-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f8fafc" />
              </marker>
            </defs>
            {graphEdges.map((edge) => (
              <path
                key={`${edge.from}-${edge.to}`}
                d={edgePath(edge)}
                stroke="#f8fafc"
                strokeWidth="2.25"
                strokeLinecap="round"
                markerEnd="url(#roadmap-arrow)"
                opacity="0.9"
              />
            ))}
          </svg>
          {graphNodes.map((node) => (
            <RoadmapNode key={node.id} node={node} />
          ))}
        </div>
      </div>

      <div className="block p-4 sm:hidden">
        <div className="space-y-5">
          {mobileLevels.map((level, index) => (
            <div key={level.join("-")} className="relative">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="absolute -top-5 left-1/2 h-5 w-px bg-slate-400"
                />
              ) : null}
              <div className="grid grid-cols-1 gap-3">
                {level.map((id) => {
                  const node = nodeById.get(id);

                  if (!node) {
                    return null;
                  }

                  return <MobileRoadmapNode key={id} node={node} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileRoadmapNode({ node }: { node: GraphNode }) {
  const isLocked = node.status === "locked";
  const isCheckpoint = node.status === "checkpoint";
  const className = [
    "mx-auto grid min-h-12 w-full max-w-[260px] grid-cols-[1fr_auto] items-center gap-3 rounded-md border px-3 py-2 shadow-lg",
    isLocked
      ? "border-slate-600 bg-slate-800 text-slate-300"
      : isCheckpoint
        ? "border-amber-300 bg-amber-500 text-slate-950"
        : "border-blue-300 bg-blue-600 text-white",
  ].join(" ");

  const content = (
    <>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold">{node.title}</span>
        <span className="mt-1 block truncate text-[10px] font-semibold uppercase tracking-[0.08em] opacity-80">
          {node.subtitle}
        </span>
      </span>
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          isLocked ? "bg-slate-500" : isCheckpoint ? "bg-slate-950" : "bg-emerald-300"
        }`}
      />
    </>
  );

  if (node.href) {
    return (
      <Link href={node.href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
