const { performance } = require('perf_hooks');
const N = 100_000;

// ── push: O(1) amortised ─────────────────────────────────────────────────────
const pushArr = [];
const t0 = performance.now();
for (let i = 0; i < N; i++) pushArr.push(i);
const pushMs = (performance.now() - t0).toFixed(3);
console.log(`push:    ${pushMs} ms`);

// ── unshift: O(n) per call ───────────────────────────────────────────────────
const unshiftArr = [];
const t1 = performance.now();
for (let i = 0; i < N; i++) unshiftArr.unshift(i);
const unshiftMs = (performance.now() - t1).toFixed(3);
console.log(`unshift: ${unshiftMs} ms`);

// ── Summary ──────────────────────────────────────────────────────────────────
console.log(`
════════════════════════════════════════════════════════
 Performance Summary  (n = ${N.toLocaleString()})
════════════════════════════════════════════════════════

Measured times on this machine
  push    ${pushMs.padStart(10)} ms   O(n)  total
  unshift ${unshiftMs.padStart(10)} ms   O(n²) total

O(1) operations
  Stack  — push, pop, peek, size, isEmpty
           All work only at the top of the internal array;
           no element is ever moved or re-indexed.

  Queue (ring buffer) — enqueue, dequeue, front, size,
                        isEmpty, isFull
           The buffer is allocated once. enqueue writes to
           items[tail] and advances tail by 1 (mod capacity).
           dequeue reads from items[head] and advances head
           by 1 (mod capacity). Neither touches any other slot.

Why the ring buffer avoids shift / unshift
  A plain-array queue dequeues with shift(), which must slide
  every remaining element one index to the left — O(n) work
  per call, O(n²) for a full drain of n items.

  The ring buffer never moves elements. head and tail are just
  integer cursors that wrap around the fixed backing array with
  the modulo operator. Dequeuing costs exactly two operations:
  read items[head], increment head. The O(n²) sliding cost is
  eliminated entirely.
════════════════════════════════════════════════════════
`);
