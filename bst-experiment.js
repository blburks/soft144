const { BinarySearchTree } = require('./bst');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTree(values) {
  const bst = new BinarySearchTree();
  values.forEach(v => bst.insert(v));
  return bst;
}

// Returns average time in milliseconds over `runs` searches.
function timeSearches(bst, searchValues, runs = 1000) {
  const start = performance.now();
  for (let i = 0; i < runs; i++) {
    for (const v of searchValues) bst.contains(v);
  }
  return (performance.now() - start) / runs;
}

// Returns average time in milliseconds to insert all values `runs` times.
function timeInserts(values, runs = 1000) {
  const start = performance.now();
  for (let i = 0; i < runs; i++) {
    buildTree(values);
  }
  return (performance.now() - start) / runs;
}

function report(label, bst, insertValues, searchValues) {
  const height    = bst.height();
  const searchMs  = timeSearches(bst, searchValues).toFixed(4);
  const insertMs  = timeInserts(insertValues).toFixed(4);

  console.log(`\n${label}`);
  console.log(`  Height            : ${height}`);
  console.log(`  Ideal log₂(n)     : ${Math.floor(Math.log2(insertValues.length))}`);
  console.log(`  Avg search time   : ${searchMs} ms  (per 1 000 searches)`);
  console.log(`  Avg insert time   : ${insertMs} ms  (per full rebuild × 1 000)`);
}

// ─── Experiment ───────────────────────────────────────────────────────────────

const SIZE = 1000;
const values = Array.from({ length: SIZE }, (_, i) => i + 1); // 1 … 1000
const randomValues = shuffle(values);

// Values to search: mix of hits and misses
const searchValues = [1, 100, 250, 500, 750, 999, 1000, 42, 777, 1001];

console.log('='.repeat(50));
console.log(`  BST Insertion Order Experiment  (n = ${SIZE})`);
console.log('='.repeat(50));

const sortedBST = buildTree(values);
const randomBST = buildTree(randomValues);

report('Sorted insertion  [1, 2, 3, … 1000]', sortedBST, values, searchValues);
report('Random insertion  (shuffled)',         randomBST, randomValues, searchValues);

// ─── Side-by-side summary ─────────────────────────────────────────────────────
console.log('\n' + '='.repeat(50));
console.log('  Summary');
console.log('='.repeat(50));

const idealHeight = Math.floor(Math.log2(SIZE));
const sortedHeight = sortedBST.height();
const randomHeight = randomBST.height();

console.log(`  n                    : ${SIZE}`);
console.log(`  Ideal height (log₂n) : ${idealHeight}`);
console.log(`  Sorted BST height    : ${sortedHeight}   ← degenerate (linked list)`);
console.log(`  Random BST height    : ${randomHeight}   ← near-balanced`);
console.log(`  Height ratio         : ${(sortedHeight / randomHeight).toFixed(1)}× taller when sorted`);
console.log();
console.log('  Why it matters:');
console.log('  Sorted insertion always goes right → O(n) height → O(n) search.');
console.log('  Random insertion averages O(log n) height → O(log n) search.');
console.log('  A self-balancing BST (AVL, Red-Black) solves this automatically.\n');
