# SOFT 144 — Data Structures in JavaScript

## Overview

Two labs implementing classic data structures from scratch in plain JavaScript, with unit tests and performance experiments.

---

## Lab 1: Stack & Queue

| File | Description |
|---|---|
| `stack.js` | Stack class (LIFO) using an internal array |
| `queue.js` | Queue class (FIFO) using a fixed-capacity ring buffer |
| `naiveQueue.js` | Naive queue using `Array.unshift` for comparison |
| `tests.js` | Unit-like tests using `console.assert` |
| `benchmark.js` | Benchmarks `Array.push` O(1) vs `Array.unshift` O(n) |

```bash
node tests.js
node benchmark.js
```

**Key concepts:** Stack (LIFO), Queue (FIFO), Ring Buffer, O(1) vs O(n) time complexity.

---

## Lab 2: Binary Search Tree (BST)

| File | Description |
|---|---|
| `bst.js` | `Node` + `BinarySearchTree` class with insert, contains, remove, height, and all three traversals |
| `bst.test.js` | 31 tests covering insert, contains, remove (leaf / one child / two children / root), traversals, and edge cases |
| `bst-experiment.js` | Timing experiment comparing sorted vs random insertion order |
| `ANALYSIS.md` | Written analysis of experiment results |

```bash
node bst.js
node bst.test.js
node bst-experiment.js
```

### Methods

- `insert(value)` — adds a value, ignores duplicates
- `contains(value)` — returns `true`/`false`
- `remove(value)` — handles leaf, one child, and two children cases
- `height()` — returns the height of the tree
- `inOrderTraversal()` — left → node → right (returns sorted output)
- `preOrderTraversal()` — node → left → right
- `postOrderTraversal()` — left → right → node

### Experiment Results

Inserting 1,000 values in **sorted order** produces a tree of height 999 (a linked list).
Inserting the same values in **random order** produces a tree of height ~25.
Search is ~13x faster on the random tree. See `ANALYSIS.md` for full results.

---

## Key Concepts

| Concept | Description |
|---|---|
| BST property | Left child < parent < right child |
| Worst case | Sorted insertion → O(n) height → O(n) search |
| Average case | Random insertion → O(log n) height → O(log n) search |
| Self-balancing trees | AVL / Red-Black trees fix the sorted-input problem automatically |
