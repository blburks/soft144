// Queue implemented as a fixed-capacity ring buffer
class Queue {
  constructor(capacity) {
    this.capacity = capacity;
    this.items = new Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  enqueue(item) {
    if (this.isFull()) throw new Error('Queue is full');
    this.items[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) throw new Error('Queue is empty');
    const item = this.items[this.head];
    this.items[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return item;
  }

  front() {
    if (this.isEmpty()) throw new Error('Queue is empty');
    return this.items[this.head];
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  isFull() {
    return this.count === this.capacity;
  }
}

module.exports = Queue;
