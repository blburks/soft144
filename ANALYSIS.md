# BST Insertion Order — Analysis

## Experiment Setup

- **n = 1000** values (integers 1–1000)
- **Tree A:** inserted in sorted order `[1, 2, 3, … 1000]`
- **Tree B:** inserted in the same values, but shuffled randomly
- Measured: tree **height**, average **search time** (per 1 000 searches), average **insert time** (per full rebuild × 1 000 runs)

---

## Results

| Metric | Sorted BST | Random BST |
|---|---|---|
| Height | **999** | **25** |
| Ideal height (log₂ 1000) | 9 | 9 |
| Avg search time | 0.0122 ms | 0.0009 ms |
| Avg insert time | 0.9121 ms | 0.0399 ms |

---

## Why the Results Differ

### Sorted insertion → degenerate tree (worst case)

When values arrive in ascending order, every new value is **larger than all existing nodes**, so `insert` always walks to the rightmost position. The result is a tree that looks like this:

```
1
 \
  2
   \
    3
     \
      ...
       \
       1000
```

This is structurally identical to a **linked list**. Height = n = 1000 (vs. ideal of 9).

- **Search:** must traverse up to 1000 nodes — **O(n)**
- **Insert:** same worst-case walk — **O(n)**

### Random insertion → near-balanced tree (average case)

When values arrive in random order, roughly half of them land to the left of any given node and half to the right. The tree spreads out in both directions and stays relatively flat. Height landed at **25** — only ~2.8× the theoretical minimum.

- **Search:** traverses at most ~25 nodes — **O(log n)**
- **Insert:** same short path — **O(log n)**

### Performance gap

| Operation | How much faster with random order |
|---|---|
| Search | ~13× faster |
| Insert | ~23× faster |

This gap widens as n grows. At n = 1,000,000, sorted insertion would require up to one million comparisons per search; a balanced tree would need about 20.

---

## Key Takeaway

A plain BST gives **O(log n)** performance only when the tree stays balanced. Sorted (or nearly sorted) input destroys that guarantee. This is exactly the problem that **self-balancing trees** (AVL trees, Red-Black trees) were designed to solve — they automatically rotate nodes after each insert to keep height at O(log n) regardless of input order.
