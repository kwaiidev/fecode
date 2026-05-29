export type Difficulty = "Warmup" | "Core" | "Exam";

export type ProblemStatus =
  | "not-started"
  | "attempted"
  | "solved"
  | "mastered"
  | "needs-review";

export type TopicStatus =
  | "available"
  | "locked"
  | "not-started"
  | "attempted"
  | "mastered"
  | "needs-review";

export type ProblemType =
  | "Tracing"
  | "Coding"
  | "Analysis"
  | "Derivation"
  | "Conversion";

export type TopicNode = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: TopicStatus;
  problemTypes: ProblemType[];
  estimatedMinutes: number;
  prerequisiteSlugs?: string[];
  commonTraps?: string[];
  children?: TopicNode[];
};

export type RoadmapSection = {
  id: string;
  code: "A" | "B" | "C" | "D";
  title: string;
  summary: string;
  accent: string;
  children: TopicNode[];
};

export type ProblemRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  topicSlug: string;
  difficulty: Difficulty;
  examTerm: string;
  problemType: ProblemType;
  status: ProblemStatus;
  averageScore: number | null;
  estimatedMinutes: number;
  prompt: string;
  starterCode?: string;
  hints: string[];
  solution: string;
  rubric: {
    label: string;
    points: number;
    note: string;
  }[];
  source: {
    label: string;
    detail: string;
  };
};

const outlineSource = {
  label: "Foundation Exam Review Sheet",
  detail: "Local FE-ExamOutline.pdf, Foundation Exam Structure (January 2022 - beyond)",
};

const types = {
  tracingCoding: ["Tracing", "Coding"] as ProblemType[],
  analysis: ["Analysis"] as ProblemType[],
  derivation: ["Derivation", "Analysis"] as ProblemType[],
  conversion: ["Conversion"] as ProblemType[],
};

export const roadmapSections: RoadmapSection[] = [
  {
    id: "section-a",
    code: "A",
    title: "Basic Data Structures",
    summary:
      "C memory, linked structures, stacks, and queues. These nodes unlock the advanced data structure branch.",
    accent: "border-amber-400 bg-amber-50 text-amber-950",
    children: [
      {
        id: "a1",
        slug: "dynamic-memory-management-c",
        title: "Dynamic Memory Management in C",
        summary:
          "Trace and write malloc/free code for structs, arrays, 2D arrays, and array-of-array layouts.",
        status: "available",
        problemTypes: types.tracingCoding,
        estimatedMinutes: 75,
        commonTraps: [
          "Forgetting space for every nested allocation",
          "Freeing rows without freeing the outer array",
          "Using an uninitialized pointer after malloc fails",
        ],
        children: [
          {
            id: "a1-i",
            slug: "malloc-structs",
            title: "Struct Allocation",
            summary: "Allocate a struct, initialize fields, and pass it through helper functions.",
            status: "available",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
          },
          {
            id: "a1-ii",
            slug: "malloc-arrays",
            title: "Array Allocation",
            summary: "Allocate, fill, resize mentally, and free one-dimensional arrays.",
            status: "not-started",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["malloc-structs"],
          },
          {
            id: "a1-iii",
            slug: "malloc-2d-arrays",
            title: "2D Array Allocation",
            summary: "Allocate rows and columns cleanly while tracking pointer levels.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["malloc-arrays"],
          },
          {
            id: "a1-iv",
            slug: "array-of-arrays",
            title: "Array of Arrays",
            summary: "Work with ragged arrays and separate allocation lengths.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["malloc-2d-arrays"],
          },
          {
            id: "a1-v",
            slug: "array-problem-solving",
            title: "Array Problem Solving",
            summary: "Apply dynamic arrays to small exam-style coding tasks.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 25,
            prerequisiteSlugs: ["array-of-arrays"],
          },
          {
            id: "a1-vi",
            slug: "freeing-memory",
            title: "Freeing Memory",
            summary: "Free every allocation exactly once and avoid dangling pointer assumptions.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["array-problem-solving"],
          },
          {
            id: "a1-capstone",
            slug: "dynamic-memory-checkpoint",
            title: "Memory Checkpoint",
            summary: "Mixed allocation/free trace before moving to linked structures.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 30,
            prerequisiteSlugs: ["freeing-memory"],
          },
        ],
      },
      {
        id: "a2",
        slug: "linked-lists",
        title: "Linked Lists",
        summary:
          "Practice node allocation, NULL checks, insertion, deletion, recursion, and structural modification.",
        status: "locked",
        problemTypes: types.tracingCoding,
        estimatedMinutes: 90,
        prerequisiteSlugs: ["dynamic-memory-checkpoint"],
        commonTraps: [
          "Losing the head pointer during insertion or deletion",
          "Calling free before saving the next pointer",
          "Skipping empty-list and one-node-list cases",
        ],
        children: [
          {
            id: "a2-i",
            slug: "linked-list-new-node",
            title: "New Node Allocation",
            summary: "Allocate a node, initialize fields, and connect it safely.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["dynamic-memory-checkpoint"],
          },
          {
            id: "a2-ii",
            slug: "linked-list-null-checks",
            title: "NULL Checks",
            summary: "Recognize when pointer checks belong before dereferences.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["linked-list-new-node"],
          },
          {
            id: "a2-iii",
            slug: "linked-list-free",
            title: "free and Ownership",
            summary: "Explain what free changes and what it does not change.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["linked-list-null-checks"],
          },
          {
            id: "a2-iv",
            slug: "linked-list-iteration-recursion",
            title: "Iteration vs. Recursion",
            summary: "Trace the same linked-list task iteratively and recursively.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["linked-list-free"],
          },
          {
            id: "a2-v",
            slug: "linked-list-insertion",
            title: "Insertion",
            summary: "Insert at the head, middle, tail, and sorted positions.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 25,
            prerequisiteSlugs: ["linked-list-iteration-recursion"],
          },
          {
            id: "a2-vi",
            slug: "linked-list-deletion",
            title: "Deletion",
            summary: "Delete by value or position while preserving list structure.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 25,
            prerequisiteSlugs: ["linked-list-insertion"],
          },
          {
            id: "a2-vii",
            slug: "linked-list-structural-modification",
            title: "Structural Modification",
            summary: "Reverse, split, merge, or otherwise reshape list links.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 30,
            prerequisiteSlugs: ["linked-list-deletion"],
          },
          {
            id: "a2-capstone",
            slug: "linked-list-checkpoint",
            title: "Linked List Checkpoint",
            summary: "Mixed pointer trace and coding prompt before stacks and queues.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 35,
            prerequisiteSlugs: ["linked-list-structural-modification"],
          },
        ],
      },
      {
        id: "a3",
        slug: "abstract-data-structures",
        title: "Abstract Data Structures",
        summary:
          "Stacks and queues with array and linked-list implementations plus expression problems.",
        status: "locked",
        problemTypes: types.tracingCoding,
        estimatedMinutes: 100,
        prerequisiteSlugs: ["linked-list-checkpoint"],
        children: [
          {
            id: "a3-stack",
            slug: "stacks",
            title: "Stacks",
            summary: "Use LIFO behavior to convert and evaluate expressions.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 55,
            prerequisiteSlugs: ["linked-list-checkpoint"],
            children: [
              {
                id: "a3-stack-a",
                slug: "infix-to-postfix",
                title: "Infix to Postfix",
                summary: "Apply precedence and associativity with a stack.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 20,
                prerequisiteSlugs: ["stacks"],
              },
              {
                id: "a3-stack-b",
                slug: "postfix-evaluation",
                title: "Postfix Evaluation",
                summary: "Trace operand pushes and operator reductions.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["infix-to-postfix"],
              },
              {
                id: "a3-stack-c",
                slug: "stack-array-implementation",
                title: "Array Stack",
                summary: "Track top indexes, capacity, push, pop, and empty checks.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["postfix-evaluation"],
              },
              {
                id: "a3-stack-d",
                slug: "stack-linked-list-implementation",
                title: "Linked Stack",
                summary: "Implement stack operations with linked nodes.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["stack-array-implementation"],
              },
            ],
          },
          {
            id: "a3-queue",
            slug: "queues",
            title: "Queues",
            summary: "Use FIFO behavior with circular arrays and linked nodes.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 45,
            prerequisiteSlugs: ["stack-linked-list-implementation"],
            children: [
              {
                id: "a3-queue-a",
                slug: "queue-array-implementation",
                title: "Array Queue",
                summary: "Track front, back, size, wrap-around, and full checks.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 20,
                prerequisiteSlugs: ["stack-linked-list-implementation"],
              },
              {
                id: "a3-queue-b",
                slug: "queue-linked-list-implementation",
                title: "Linked Queue",
                summary: "Maintain front and back pointers for enqueue and dequeue.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 20,
                prerequisiteSlugs: ["queue-array-implementation"],
              },
            ],
          },
          {
            id: "a3-capstone",
            slug: "abstract-data-structures-checkpoint",
            title: "Stacks and Queues Checkpoint",
            summary: "Mixed stack/queue trace before advanced data structures.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 35,
            prerequisiteSlugs: ["queue-linked-list-implementation"],
          },
        ],
      },
    ],
  },
  {
    id: "section-b",
    code: "B",
    title: "Advanced Data Structures",
    summary:
      "Trees, hash tables, heaps, AVL trees, and tries. These nodes expect comfort with pointers and recursion.",
    accent: "border-teal-400 bg-teal-50 text-teal-950",
    children: [
      {
        id: "b1",
        slug: "binary-trees",
        title: "Binary Trees",
        summary:
          "Allocate tree nodes, trace traversals, free trees, and solve recursive height/sum variants.",
        status: "locked",
        problemTypes: types.tracingCoding,
        estimatedMinutes: 95,
        prerequisiteSlugs: ["abstract-data-structures-checkpoint"],
        commonTraps: [
          "Mixing preorder, inorder, and postorder visit timing",
          "Forgetting base cases for empty subtrees",
          "Computing height with the wrong empty-tree convention",
        ],
        children: [
          {
            id: "b1-i",
            slug: "binary-tree-new-node",
            title: "Tree Node Allocation",
            summary: "Allocate and initialize left and right child pointers.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["abstract-data-structures-checkpoint"],
          },
          {
            id: "b1-ii",
            slug: "binary-tree-null-checks",
            title: "Tree NULL Checks",
            summary: "Handle empty trees and missing child pointers.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["binary-tree-new-node"],
          },
          {
            id: "b1-iii",
            slug: "tree-traversals",
            title: "Tree Traversals",
            summary: "Trace preorder, inorder, postorder, and level-order variants.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 25,
            prerequisiteSlugs: ["binary-tree-null-checks"],
          },
          {
            id: "b1-iv",
            slug: "freeing-trees",
            title: "Freeing Trees",
            summary: "Free every node using postorder ownership logic.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["tree-traversals"],
          },
          {
            id: "b1-v",
            slug: "tree-recursion",
            title: "Tree Recursion",
            summary: "Reduce tree questions to left and right subtree calls.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["freeing-trees"],
          },
          {
            id: "b1-vi",
            slug: "tree-sum-height",
            title: "Sum and Height",
            summary: "Compute aggregate values from recursive subtree results.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 25,
            prerequisiteSlugs: ["tree-recursion"],
          },
          {
            id: "b1-capstone",
            slug: "binary-tree-checkpoint",
            title: "Binary Tree Checkpoint",
            summary: "Mixed traversal, recursion, allocation, and freeing practice.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 35,
            prerequisiteSlugs: ["tree-sum-height"],
          },
        ],
      },
      {
        id: "b2",
        slug: "advanced-data-structures",
        title: "Hash Tables and Heaps",
        summary:
          "Hash function properties, collision strategies, and binary heap insertion/deletion.",
        status: "locked",
        problemTypes: types.tracingCoding,
        estimatedMinutes: 95,
        prerequisiteSlugs: ["binary-tree-checkpoint"],
        children: [
          {
            id: "b2-hash",
            slug: "hash-tables",
            title: "Hash Tables",
            summary: "Trace hash placement, lookup, collision handling, and chaining.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 55,
            prerequisiteSlugs: ["binary-tree-checkpoint"],
            children: [
              {
                id: "b2-hash-a",
                slug: "hash-function-properties",
                title: "Hash Function Properties",
                summary: "Reason about distribution, determinism, and table size effects.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["binary-tree-checkpoint"],
              },
              {
                id: "b2-hash-b",
                slug: "linear-probing",
                title: "Linear Probing",
                summary: "Trace collisions with sequential probing.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["hash-function-properties"],
              },
              {
                id: "b2-hash-c",
                slug: "quadratic-probing",
                title: "Quadratic Probing",
                summary: "Trace collisions with squared-offset probing.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["linear-probing"],
              },
              {
                id: "b2-hash-d",
                slug: "separate-chaining",
                title: "Separate Chaining",
                summary: "Trace linked buckets and collision chains.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 20,
                prerequisiteSlugs: ["quadratic-probing"],
              },
            ],
          },
          {
            id: "b2-heap",
            slug: "binary-heaps",
            title: "Binary Heaps",
            summary: "Trace heap shape, insertion bubble-up, and delete-min/max push-down.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 40,
            prerequisiteSlugs: ["separate-chaining"],
            children: [
              {
                id: "b2-heap-a",
                slug: "heap-insertion",
                title: "Heap Insertion",
                summary: "Insert at the next open slot and restore heap order.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 20,
                prerequisiteSlugs: ["separate-chaining"],
              },
              {
                id: "b2-heap-b",
                slug: "heap-delete-min-max",
                title: "Delete Min/Max",
                summary: "Move the last node to the root and percolate down.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 20,
                prerequisiteSlugs: ["heap-insertion"],
              },
            ],
          },
          {
            id: "b2-capstone",
            slug: "hash-heap-checkpoint",
            title: "Hash and Heap Checkpoint",
            summary: "Mixed collision and heap operation tracing.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 35,
            prerequisiteSlugs: ["heap-delete-min-max"],
          },
        ],
      },
      {
        id: "b3",
        slug: "advanced-tree-structures",
        title: "Advanced Tree Structures",
        summary: "AVL rotations and trie insertion/search traces.",
        status: "locked",
        problemTypes: types.tracingCoding,
        estimatedMinutes: 80,
        prerequisiteSlugs: ["hash-heap-checkpoint"],
        children: [
          {
            id: "b3-avl",
            slug: "avl-trees",
            title: "AVL Trees",
            summary: "Trace inserts, deletes, searches, balance factors, and rotations.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 50,
            prerequisiteSlugs: ["hash-heap-checkpoint"],
            children: [
              {
                id: "b3-avl-a",
                slug: "avl-inserts",
                title: "Tracing Inserts",
                summary: "Find the first unbalanced ancestor and rotate correctly.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 20,
                prerequisiteSlugs: ["hash-heap-checkpoint"],
              },
              {
                id: "b3-avl-b",
                slug: "avl-deletes",
                title: "Tracing Deletes",
                summary: "Update heights and rebalance after deletion.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 20,
                prerequisiteSlugs: ["avl-inserts"],
              },
              {
                id: "b3-avl-c",
                slug: "avl-search",
                title: "Searching for a Value",
                summary: "Trace AVL search like BST search while preserving balance context.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 10,
                prerequisiteSlugs: ["avl-deletes"],
              },
            ],
          },
          {
            id: "b3-trie",
            slug: "tries",
            title: "Tries",
            summary: "Trace word insertion and search using prefix nodes.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 30,
            prerequisiteSlugs: ["avl-search"],
            children: [
              {
                id: "b3-trie-a",
                slug: "trie-inserts",
                title: "Tracing Inserts",
                summary: "Create missing prefix nodes and mark word endings.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["avl-search"],
              },
              {
                id: "b3-trie-b",
                slug: "trie-search",
                title: "Searching for a Word",
                summary: "Distinguish complete words from shared prefixes.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["trie-inserts"],
              },
            ],
          },
          {
            id: "b3-capstone",
            slug: "advanced-tree-checkpoint",
            title: "Advanced Tree Checkpoint",
            summary: "Mixed AVL and trie trace before algorithm analysis.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 35,
            prerequisiteSlugs: ["trie-search"],
          },
        ],
      },
    ],
  },
  {
    id: "section-c",
    code: "C",
    title: "Algorithm Analysis",
    summary:
      "Big-O cases, implementation-sensitive analysis, timing equations, summations, and recurrence relations.",
    accent: "border-sky-400 bg-sky-50 text-sky-950",
    children: [
      {
        id: "c1",
        slug: "algorithm-analysis",
        title: "Algorithm Analysis",
        summary:
          "Analyze known data structures, best/average/worst cases, implementations, and new problems.",
        status: "locked",
        problemTypes: types.analysis,
        estimatedMinutes: 70,
        prerequisiteSlugs: ["advanced-tree-checkpoint"],
        commonTraps: [
          "Analyzing the abstract data type but ignoring the implementation",
          "Mixing input size with a loop counter's current value",
          "Using worst case when the prompt asks for best or average",
        ],
        children: [
          {
            id: "c1-i",
            slug: "known-data-structure-analysis",
            title: "Known Data Structures",
            summary: "Recall core operation costs for lists, stacks, queues, trees, heaps, and hashes.",
            status: "locked",
            problemTypes: types.analysis,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["advanced-tree-checkpoint"],
          },
          {
            id: "c1-ii",
            slug: "best-average-worst-case",
            title: "Best, Average, Worst Cases",
            summary: "State which input arrangement controls each bound.",
            status: "locked",
            problemTypes: types.analysis,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["known-data-structure-analysis"],
          },
          {
            id: "c1-iii",
            slug: "implementation-based-analysis",
            title: "Implementation-Based Analysis",
            summary: "Account for array, linked, tree, heap, and hash implementation details.",
            status: "locked",
            problemTypes: types.analysis,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["best-average-worst-case"],
          },
          {
            id: "c1-iv",
            slug: "new-problem-analysis",
            title: "New Problem Analysis",
            summary: "Break unfamiliar code into counted operations and dominant terms.",
            status: "locked",
            problemTypes: types.analysis,
            estimatedMinutes: 25,
            prerequisiteSlugs: ["implementation-based-analysis"],
          },
        ],
      },
      {
        id: "c2",
        slug: "timing-questions",
        title: "Timing Questions",
        summary:
          "Set up an unknown constant, solve it from a reference timing, and apply the direct formula.",
        status: "locked",
        problemTypes: types.analysis,
        estimatedMinutes: 55,
        prerequisiteSlugs: ["new-problem-analysis"],
        children: [
          {
            id: "c2-i",
            slug: "timing-unknown-constant",
            title: "Unknown Constant Setup",
            summary: "Build T(n) = c * f(n) from the given growth rate.",
            status: "locked",
            problemTypes: types.analysis,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["new-problem-analysis"],
          },
          {
            id: "c2-ii",
            slug: "timing-solve-constant",
            title: "Solve the Constant",
            summary: "Use known timing data to isolate c.",
            status: "locked",
            problemTypes: types.analysis,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["timing-unknown-constant"],
          },
          {
            id: "c2-iii",
            slug: "timing-direct-formula",
            title: "Direct Formula",
            summary: "Predict time for a new input size with the solved formula.",
            status: "locked",
            problemTypes: types.analysis,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["timing-solve-constant"],
          },
          {
            id: "c2-iv",
            slug: "loop-summations",
            title: "Loop Summations",
            summary: "Translate loop counts into summations before simplifying.",
            status: "locked",
            problemTypes: types.derivation,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["timing-direct-formula"],
          },
        ],
      },
      {
        id: "c3",
        slug: "summations-recurrence-relations",
        title: "Summations and Recurrence Relations",
        summary:
          "Split summations, apply formulas, respect indices, derive recurrences from code, and solve by iteration.",
        status: "locked",
        problemTypes: types.derivation,
        estimatedMinutes: 85,
        prerequisiteSlugs: ["loop-summations"],
        children: [
          {
            id: "c3-i",
            slug: "split-summations",
            title: "Split Summations",
            summary: "Separate constants, linear terms, and nested expressions.",
            status: "locked",
            problemTypes: types.derivation,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["loop-summations"],
          },
          {
            id: "c3-ii",
            slug: "summation-formulas",
            title: "Summation Formulas",
            summary: "Apply arithmetic, geometric, and polynomial summation formulas.",
            status: "locked",
            problemTypes: types.derivation,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["split-summations"],
          },
          {
            id: "c3-iii",
            slug: "summation-indices",
            title: "Index Discipline",
            summary: "Track start/end values and avoid replacing every symbol with n.",
            status: "locked",
            problemTypes: types.derivation,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["summation-formulas"],
          },
          {
            id: "c3-v",
            slug: "derive-recurrence-from-code",
            title: "Derive Recurrences from Code",
            summary: "Identify recursive calls, non-recursive work, and base cases.",
            status: "locked",
            problemTypes: types.derivation,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["summation-indices"],
          },
          {
            id: "c3-vi",
            slug: "solve-recurrence-by-iteration",
            title: "Solve by Iteration",
            summary: "Expand recurrence levels until the pattern and stopping point are clear.",
            status: "locked",
            problemTypes: types.derivation,
            estimatedMinutes: 25,
            prerequisiteSlugs: ["derive-recurrence-from-code"],
          },
          {
            id: "c3-capstone",
            slug: "analysis-checkpoint",
            title: "Analysis Checkpoint",
            summary: "Mixed Big-O, timing, summation, and recurrence practice.",
            status: "locked",
            problemTypes: types.derivation,
            estimatedMinutes: 40,
            prerequisiteSlugs: ["solve-recurrence-by-iteration"],
          },
        ],
      },
    ],
  },
  {
    id: "section-d",
    code: "D",
    title: "Algorithms",
    summary:
      "Recursive coding, sorting traces, base conversion, and bitwise subset reasoning.",
    accent: "border-rose-400 bg-rose-50 text-rose-950",
    children: [
      {
        id: "d1",
        slug: "recursive-coding",
        title: "Recursive Coding",
        summary:
          "Write recursive solutions with terminating conditions, smaller subproblems, and classic patterns.",
        status: "locked",
        problemTypes: types.tracingCoding,
        estimatedMinutes: 85,
        prerequisiteSlugs: ["analysis-checkpoint"],
        commonTraps: [
          "Writing an iterative solution when recursion is required",
          "Changing input without moving toward a base case",
          "Forgetting work before or after the recursive call",
        ],
        children: [
          {
            id: "d1-i",
            slug: "recursive-base-case",
            title: "Terminating Conditions",
            summary: "Choose base cases that cover the smallest valid inputs.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["analysis-checkpoint"],
          },
          {
            id: "d1-ii",
            slug: "recursive-non-terminating-case",
            title: "Recursive Case",
            summary: "Define work for all non-base cases.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["recursive-base-case"],
          },
          {
            id: "d1-iii",
            slug: "smaller-instances",
            title: "Smaller Instances",
            summary: "Reduce the question to smaller versions of itself.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["recursive-non-terminating-case"],
          },
          {
            id: "d1-v",
            slug: "towers-of-hanoi",
            title: "Towers of Hanoi",
            summary: "Trace and explain the classic move pattern.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["smaller-instances"],
          },
          {
            id: "d1-vi",
            slug: "permutation-recursion",
            title: "Permutation",
            summary: "Generate permutations by fixing one choice and recursing on the rest.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 25,
            prerequisiteSlugs: ["towers-of-hanoi"],
          },
          {
            id: "d1-vii",
            slug: "floodfill-recursion",
            title: "Floodfill",
            summary: "Use recursive region expansion with bounds and visited checks.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 25,
            prerequisiteSlugs: ["permutation-recursion"],
          },
          {
            id: "d1-capstone",
            slug: "recursion-checkpoint",
            title: "Recursion Checkpoint",
            summary: "Mixed recursive coding and tracing practice.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 40,
            prerequisiteSlugs: ["floodfill-recursion"],
          },
        ],
      },
      {
        id: "d2",
        slug: "sorting",
        title: "Sorting",
        summary:
          "Trace insertion, selection, bubble, merge, and quick sort partition behavior.",
        status: "locked",
        problemTypes: types.tracingCoding,
        estimatedMinutes: 75,
        prerequisiteSlugs: ["recursion-checkpoint"],
        children: [
          {
            id: "d2-i",
            slug: "insertion-sort",
            title: "Insertion Sort",
            summary: "Trace shifting and insertion into a sorted prefix.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["recursion-checkpoint"],
          },
          {
            id: "d2-ii",
            slug: "selection-sort",
            title: "Selection Sort",
            summary: "Trace minimum selection and swap positions.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["insertion-sort"],
          },
          {
            id: "d2-iii",
            slug: "bubble-sort",
            title: "Bubble Sort",
            summary: "Trace adjacent swaps and pass boundaries.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 15,
            prerequisiteSlugs: ["selection-sort"],
          },
          {
            id: "d2-iv",
            slug: "merge-sort",
            title: "Merge Sort and Merge",
            summary: "Trace recursive splits and the merge operation.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["bubble-sort"],
          },
          {
            id: "d2-v",
            slug: "quick-sort-partition",
            title: "Quick Sort Partition",
            summary: "Trace pivot placement and partition boundaries.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 20,
            prerequisiteSlugs: ["merge-sort"],
          },
          {
            id: "d2-capstone",
            slug: "sorting-checkpoint",
            title: "Sorting Checkpoint",
            summary: "Mixed sorting trace and comparison practice.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 35,
            prerequisiteSlugs: ["quick-sort-partition"],
          },
        ],
      },
      {
        id: "d3",
        slug: "base-conversion-bitwise-operators",
        title: "Base Conversion and Bitwise Operators",
        summary:
          "Convert bases and reason about bitwise operators as subset operations.",
        status: "locked",
        problemTypes: ["Conversion", "Tracing"],
        estimatedMinutes: 70,
        prerequisiteSlugs: ["sorting-checkpoint"],
        children: [
          {
            id: "d3-base",
            slug: "base-conversion",
            title: "Base Conversion",
            summary: "Move between base b, base 10, and power-of-two bases through base 2.",
            status: "locked",
            problemTypes: types.conversion,
            estimatedMinutes: 35,
            prerequisiteSlugs: ["sorting-checkpoint"],
            children: [
              {
                id: "d3-base-a",
                slug: "base-b-to-10",
                title: "Base b to Base 10",
                summary: "Evaluate positional notation into decimal.",
                status: "locked",
                problemTypes: types.conversion,
                estimatedMinutes: 12,
                prerequisiteSlugs: ["sorting-checkpoint"],
              },
              {
                id: "d3-base-b",
                slug: "base-10-to-b",
                title: "Base 10 to Base b",
                summary: "Use repeated division and remainders.",
                status: "locked",
                problemTypes: types.conversion,
                estimatedMinutes: 12,
                prerequisiteSlugs: ["base-b-to-10"],
              },
              {
                id: "d3-base-c",
                slug: "binary-octal-hex-conversion",
                title: "Bases 2, 4, 8, and 16",
                summary: "Convert power-of-two bases by grouping binary digits.",
                status: "locked",
                problemTypes: types.conversion,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["base-10-to-b"],
              },
            ],
          },
          {
            id: "d3-bitwise",
            slug: "bitwise-operators",
            title: "Bitwise Operators",
            summary: "Use &, |, ^, shifts, and bit masks to represent subsets.",
            status: "locked",
            problemTypes: types.tracingCoding,
            estimatedMinutes: 35,
            prerequisiteSlugs: ["binary-octal-hex-conversion"],
            children: [
              {
                id: "d3-bitwise-a",
                slug: "bitwise-mechanics",
                title: "Operator Mechanics",
                summary: "Trace &, |, ^, >>, and << at the bit level.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["binary-octal-hex-conversion"],
              },
              {
                id: "d3-bitwise-b",
                slug: "bitwise-set-meanings",
                title: "Set Meanings",
                summary: "Map bitwise operations to union, intersection, difference, and toggling.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["bitwise-mechanics"],
              },
              {
                id: "d3-bitwise-c",
                slug: "bit-checking",
                title: "Checking Bits",
                summary: "Test whether a bit is on or off with masks and shifts.",
                status: "locked",
                problemTypes: types.tracingCoding,
                estimatedMinutes: 15,
                prerequisiteSlugs: ["bitwise-set-meanings"],
              },
            ],
          },
          {
            id: "d3-capstone",
            slug: "base-bitwise-checkpoint",
            title: "Base and Bitwise Checkpoint",
            summary: "Mixed conversion and subset-bitmask practice.",
            status: "locked",
            problemTypes: ["Conversion", "Tracing"],
            estimatedMinutes: 35,
            prerequisiteSlugs: ["bit-checking"],
          },
        ],
      },
    ],
  },
];

const problemTemplates: Array<{
  id: string;
  slug: string;
  title: string;
  category: string;
  topicSlug: string;
  difficulty: Difficulty;
  problemType: ProblemType;
  estimatedMinutes: number;
  starterCode?: string;
}> = [
  {
    id: "FE-A1-001",
    slug: "dynamic-memory-practice-slot",
    title: "Dynamic Memory Practice Slot",
    category: "Dynamic Memory Management in C",
    topicSlug: "dynamic-memory-checkpoint",
    difficulty: "Core",
    problemType: "Coding",
    estimatedMinutes: 18,
    starterCode:
      "typedef struct Node {\n  int value;\n  struct Node *next;\n} Node;\n\nNode *build_nodes(int n) {\n  // Insert question-specific starter code here.\n}\n",
  },
  {
    id: "FE-A2-001",
    slug: "linked-list-practice-slot",
    title: "Linked List Practice Slot",
    category: "Linked Lists",
    topicSlug: "linked-list-checkpoint",
    difficulty: "Core",
    problemType: "Tracing",
    estimatedMinutes: 20,
  },
  {
    id: "FE-A3-001",
    slug: "stack-queue-practice-slot",
    title: "Stack and Queue Practice Slot",
    category: "Abstract Data Structures",
    topicSlug: "abstract-data-structures-checkpoint",
    difficulty: "Core",
    problemType: "Tracing",
    estimatedMinutes: 18,
  },
  {
    id: "FE-B1-001",
    slug: "binary-tree-practice-slot",
    title: "Binary Tree Practice Slot",
    category: "Binary Trees",
    topicSlug: "binary-tree-checkpoint",
    difficulty: "Core",
    problemType: "Coding",
    estimatedMinutes: 22,
    starterCode:
      "typedef struct TreeNode {\n  int data;\n  struct TreeNode *left;\n  struct TreeNode *right;\n} TreeNode;\n\nint solve(TreeNode *root) {\n  // Insert question-specific starter code here.\n}\n",
  },
  {
    id: "FE-B2-001",
    slug: "hash-heap-practice-slot",
    title: "Hash and Heap Practice Slot",
    category: "Hash Tables and Heaps",
    topicSlug: "hash-heap-checkpoint",
    difficulty: "Exam",
    problemType: "Tracing",
    estimatedMinutes: 20,
  },
  {
    id: "FE-B3-001",
    slug: "advanced-tree-practice-slot",
    title: "Advanced Tree Practice Slot",
    category: "Advanced Tree Structures",
    topicSlug: "advanced-tree-checkpoint",
    difficulty: "Exam",
    problemType: "Tracing",
    estimatedMinutes: 20,
  },
  {
    id: "FE-C1-001",
    slug: "algorithm-analysis-practice-slot",
    title: "Algorithm Analysis Practice Slot",
    category: "Algorithm Analysis",
    topicSlug: "algorithm-analysis",
    difficulty: "Core",
    problemType: "Analysis",
    estimatedMinutes: 15,
  },
  {
    id: "FE-C2-001",
    slug: "timing-question-practice-slot",
    title: "Timing Question Practice Slot",
    category: "Timing Questions",
    topicSlug: "timing-questions",
    difficulty: "Core",
    problemType: "Analysis",
    estimatedMinutes: 12,
  },
  {
    id: "FE-C3-001",
    slug: "summation-recurrence-practice-slot",
    title: "Summation and Recurrence Practice Slot",
    category: "Summations and Recurrence Relations",
    topicSlug: "analysis-checkpoint",
    difficulty: "Exam",
    problemType: "Derivation",
    estimatedMinutes: 18,
  },
  {
    id: "FE-D1-001",
    slug: "recursive-coding-practice-slot",
    title: "Recursive Coding Practice Slot",
    category: "Recursive Coding",
    topicSlug: "recursion-checkpoint",
    difficulty: "Core",
    problemType: "Coding",
    estimatedMinutes: 20,
    starterCode:
      "int recursive_solution(int input) {\n  // Insert question-specific starter code here.\n}\n",
  },
  {
    id: "FE-D2-001",
    slug: "sorting-practice-slot",
    title: "Sorting Practice Slot",
    category: "Sorting",
    topicSlug: "sorting-checkpoint",
    difficulty: "Core",
    problemType: "Tracing",
    estimatedMinutes: 15,
  },
  {
    id: "FE-D3-001",
    slug: "base-bitwise-practice-slot",
    title: "Base and Bitwise Practice Slot",
    category: "Base Conversion and Bitwise Operators",
    topicSlug: "base-bitwise-checkpoint",
    difficulty: "Warmup",
    problemType: "Conversion",
    estimatedMinutes: 12,
  },
];

export const problemBank: ProblemRecord[] = problemTemplates.map((problem) => ({
  ...problem,
  examTerm: "Manual seed",
  status: "not-started",
  averageScore: null,
  prompt: `Replace this placeholder with an FE-style ${problem.category} question. Keep the source, expected answer format, and scoring notes attached to this record.`,
  hints: [
    "Insert a first nudge that points students toward the right concept without giving away the solution.",
    "Insert a more direct hint that identifies the key case, formula, pointer move, or recursive step.",
    "Insert a final checkpoint hint that prepares the full solution reveal.",
  ],
  solution:
    "Insert the worked solution, pattern explanation, common traps, and any C or C-like pseudocode here.",
  rubric: [
    {
      label: "Setup",
      points: 2,
      note: "Defines the right variables, data structure state, or base case.",
    },
    {
      label: "Core reasoning",
      points: 5,
      note: "Applies the expected FE concept accurately through the main trace or proof.",
    },
    {
      label: "Edge cases",
      points: 2,
      note: "Handles NULL, empty input, one-node, boundary, or index cases where relevant.",
    },
    {
      label: "Clarity",
      points: 1,
      note: "Shows enough work for a grader to follow the answer.",
    },
  ],
  source: outlineSource,
}));

export type TopicEntry = TopicNode & {
  sectionCode: RoadmapSection["code"];
  sectionTitle: string;
  depth: number;
  trail: string[];
};

function flattenTopic(node: TopicNode, section: RoadmapSection, depth: number, trail: string[]): TopicEntry[] {
  const entry: TopicEntry = {
    ...node,
    sectionCode: section.code,
    sectionTitle: section.title,
    depth,
    trail,
  };

  return [
    entry,
    ...(node.children ?? []).flatMap((child) =>
      flattenTopic(child, section, depth + 1, [...trail, node.title]),
    ),
  ];
}

export const topicEntries = roadmapSections.flatMap((section) =>
  section.children.flatMap((node) => flattenTopic(node, section, 0, [section.title])),
);

export function findTopicBySlug(slug: string) {
  return topicEntries.find((topic) => topic.slug === slug);
}

export function getProblemBySlug(slug: string) {
  return problemBank.find((problem) => problem.slug === slug);
}

export function getProblemsForTopic(topicSlug: string) {
  return problemBank.filter((problem) => problem.topicSlug === topicSlug);
}

export function getProblemNeighbors(slug: string) {
  const index = problemBank.findIndex((problem) => problem.slug === slug);

  return {
    previous: index > 0 ? problemBank[index - 1] : null,
    next: index >= 0 && index < problemBank.length - 1 ? problemBank[index + 1] : null,
  };
}

export const roadmapStats = {
  sections: roadmapSections.length,
  topics: topicEntries.length,
  availableTopics: topicEntries.filter((topic) => topic.status !== "locked").length,
  lockedTopics: topicEntries.filter((topic) => topic.status === "locked").length,
  problemSlots: problemBank.length,
  estimatedMinutes: topicEntries.reduce((total, topic) => total + topic.estimatedMinutes, 0),
};
