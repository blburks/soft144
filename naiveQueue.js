// Naïve queue using a plain array — enqueue with push, dequeue with shift.
// shift() is O(n) because the engine must re-index every remaining element.
// Included only as a benchmark baseline to contrast with the O(1) ring buffer.
class NaiveQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item) { this.items.push(item); }
  dequeue()     { return this.items.shift(); }  // O(n)
  front()       { return this.items[0]; }
  size()        { return this.items.length; }
  isEmpty()     { return this.items.length === 0; }
}

module.exports = NaiveQueue;
