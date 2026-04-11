# SOFT 144 - Implementation, Tests, and Benchmarks

## Overview
This project implements a Stack (LIFO) and a Queue (FIFO) using a 
ring buffer in plain JavaScript, along with unit-like tests and 
performance benchmarks.

## Files
- `stack.js` — Stack class using an internal array
- `queue.js` — Queue class using a fixed-capacity ring buffer
- `tests.js` — Unit-like tests using console.assert
- `benchmark.js` — Benchmarks Array.push O(1) vs Array.unshift O(n)
- `naiveQueue.js` — Naive queue implementation for comparison

## How to Run
```bash
node tests.js
node benchmark.js
```

## Key Concepts
- **Stack (LIFO)** — Last In First Out
- **Queue (FIFO)** — First In First Out
- **Ring Buffer** — Fixed-capacity array using head/tail pointers
- **Big O Notation** — O(1) constant time vs O(n) linear time
