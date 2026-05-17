const { BinarySearchTree } = require('./bst');

let passed = 0;
let failed = 0;

function assert(label, actual, expected) {
  const match = JSON.stringify(actual) === JSON.stringify(expected);
  if (match) {
    console.log(`  PASS  ${label}`);
    passed++;
  } else {
    console.log(`  FAIL  ${label}`);
    console.log(`         expected: ${JSON.stringify(expected)}`);
    console.log(`         received: ${JSON.stringify(actual)}`);
    failed++;
  }
}

// ─── Build the tree ───────────────────────────────────────────────────────────
//
//            10
//           /  \
//          5    15
//         / \   / \
//        3   7 12  20
//
const bst = new BinarySearchTree();
[10, 5, 15, 3, 7, 12, 20].forEach(v => bst.insert(v));

// ─── Insert ───────────────────────────────────────────────────────────────────
console.log('\n=== Insert ===');
assert('in-order after inserts is sorted',
  bst.inOrderTraversal(),
  [3, 5, 7, 10, 12, 15, 20]);

assert('duplicate insert does not add a second copy',
  (() => { bst.insert(10); return bst.inOrderTraversal(); })(),
  [3, 5, 7, 10, 12, 15, 20]);

// ─── Contains ─────────────────────────────────────────────────────────────────
console.log('\n=== Contains ===');
assert('contains root (10)',          bst.contains(10), true);
assert('contains leaf (3)',           bst.contains(3),  true);
assert('contains leaf (20)',          bst.contains(20), true);
assert('contains inner node (5)',     bst.contains(5),  true);
assert('does not contain 9',         bst.contains(9),  false);
assert('does not contain 0',         bst.contains(0),  false);
assert('does not contain 100',       bst.contains(100),false);

// ─── Remove: leaf node ────────────────────────────────────────────────────────
console.log('\n=== Remove: leaf node ===');
// Remove 3  (leaf — no children)
bst.remove(3);
assert('leaf 3 is gone from tree',   bst.contains(3),  false);
assert('other nodes still present',  bst.inOrderTraversal(), [5, 7, 10, 12, 15, 20]);

// ─── Remove: node with one child ─────────────────────────────────────────────
console.log('\n=== Remove: node with one child ===');
// After removing 3, node 5 now has only one child (7 on the right).
// Remove 5  (one child: right = 7)
bst.remove(5);
assert('one-child node 5 is gone',   bst.contains(5),  false);
assert('its child 7 promoted',       bst.contains(7),  true);
assert('in-order still correct',     bst.inOrderTraversal(), [7, 10, 12, 15, 20]);

// ─── Remove: node with two children ──────────────────────────────────────────
console.log('\n=== Remove: node with two children ===');
// Remove 15  (two children: left = 12, right = 20)
// In-order successor of 15 is 20 (smallest in right subtree).
bst.remove(15);
assert('two-children node 15 is gone', bst.contains(15), false);
assert('children 12 and 20 still present',
  [bst.contains(12), bst.contains(20)], [true, true]);
assert('in-order after removing 15',
  bst.inOrderTraversal(), [7, 10, 12, 20]);

// ─── Remove: root node ───────────────────────────────────────────────────────
console.log('\n=== Remove: root node ===');
// Current root is 10 (two children: left = 7, right subtree has 12, 20)
bst.remove(10);
assert('root 10 is gone',            bst.contains(10), false);
assert('tree still valid after root removal',
  bst.inOrderTraversal(), [7, 12, 20]);

// ─── Traversals ───────────────────────────────────────────────────────────────
console.log('\n=== Traversals ===');
// Fresh tree for clean traversal checks
//
//        10
//       /  \
//      5    15
//     / \   / \
//    3   7 12  20
//
const t = new BinarySearchTree();
[10, 5, 15, 3, 7, 12, 20].forEach(v => t.insert(v));

assert('in-order  (L → Root → R) = sorted',
  t.inOrderTraversal(),   [3, 5, 7, 10, 12, 15, 20]);

assert('pre-order (Root → L → R)',
  t.preOrderTraversal(),  [10, 5, 3, 7, 15, 12, 20]);

assert('post-order (L → R → Root)',
  t.postOrderTraversal(), [3, 7, 5, 12, 20, 15, 10]);

// ─── Edge cases ───────────────────────────────────────────────────────────────
console.log('\n=== Edge cases ===');
const empty = new BinarySearchTree();
assert('contains on empty tree',         empty.contains(1),         false);
assert('in-order on empty tree',         empty.inOrderTraversal(),  []);
assert('pre-order on empty tree',        empty.preOrderTraversal(), []);
assert('post-order on empty tree',       empty.postOrderTraversal(),[]);
assert('remove on empty tree (no crash)',(() => { empty.remove(1); return true; })(), true);

const single = new BinarySearchTree();
single.insert(42);
assert('single node: contains 42',       single.contains(42), true);
assert('single node: in-order',          single.inOrderTraversal(), [42]);
single.remove(42);
assert('single node: empty after remove',single.inOrderTraversal(), []);
assert('single node gone after remove',  single.contains(42), false);

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n─────────────────────────────`);
console.log(`  ${passed} passed  |  ${failed} failed`);
console.log(`─────────────────────────────\n`);
if (failed > 0) process.exit(1);
