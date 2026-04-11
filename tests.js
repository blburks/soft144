const Stack = require('./stack');
const Queue = require('./queue');

// Helper: returns true if fn() throws an Error with the given message.
function throws(fn, msg) {
  try { fn(); return false; } catch (e) { return e.message === msg; }
}

// ── Stack ────────────────────────────────────────────────────────────────────

const s = new Stack();

// empty state
console.assert(s.isEmpty(),           'Stack: isEmpty on new stack');
console.assert(s.size() === 0,        'Stack: size 0 on new stack');
console.assert(s.peek() === undefined, 'Stack: peek on empty returns undefined');
console.assert(s.pop()  === undefined, 'Stack: pop on empty returns undefined');

// push + size + peek
s.push(1); s.push(2); s.push(3);
console.assert(s.size() === 3,  'Stack: size after 3 pushes');
console.assert(!s.isEmpty(),    'Stack: not empty after pushes');
console.assert(s.peek() === 3,  'Stack: peek returns top item');
console.assert(s.size() === 3,  'Stack: peek does not remove item');

// LIFO order via pop
console.assert(s.pop() === 3, 'Stack: pop LIFO 1st');
console.assert(s.pop() === 2, 'Stack: pop LIFO 2nd');
console.assert(s.pop() === 1, 'Stack: pop LIFO 3rd');
console.assert(s.isEmpty(),   'Stack: empty after popping all');

// ── Queue ────────────────────────────────────────────────────────────────────

const q = new Queue(3);

// empty state
console.assert(q.isEmpty(),   'Queue: isEmpty on new queue');
console.assert(!q.isFull(),   'Queue: not full on new queue');
console.assert(q.size() === 0, 'Queue: size 0 on new queue');

// enqueue until full
q.enqueue('a'); q.enqueue('b'); q.enqueue('c');
console.assert(q.isFull(),      'Queue: isFull after filling to capacity');
console.assert(q.size() === 3,  'Queue: size equals capacity when full');
console.assert(q.front() === 'a', 'Queue: front returns head item');

// negative: enqueue on full throws
console.assert(throws(() => q.enqueue('x'), 'Queue is full'),
  'Queue: enqueue on full throws');

// FIFO dequeue order
console.assert(q.dequeue() === 'a', 'Queue: dequeue FIFO 1st');
console.assert(q.dequeue() === 'b', 'Queue: dequeue FIFO 2nd');
console.assert(q.size() === 1,      'Queue: size decrements on dequeue');

// wrap-around: enqueue past the original tail index, then drain in order
q.enqueue('d'); q.enqueue('e');   // tail wraps to indices 0 and 1
console.assert(q.dequeue() === 'c', 'Queue: wrap-around dequeue 1st');
console.assert(q.dequeue() === 'd', 'Queue: wrap-around dequeue 2nd');
console.assert(q.dequeue() === 'e', 'Queue: wrap-around dequeue 3rd');
console.assert(q.isEmpty(),         'Queue: empty after draining all');

// negative: dequeue from empty throws
console.assert(throws(() => q.dequeue(), 'Queue is empty'),
  'Queue: dequeue on empty throws');

// negative: front on empty throws
console.assert(throws(() => q.front(), 'Queue is empty'),
  'Queue: front on empty throws');

console.log('All tests passed.');
