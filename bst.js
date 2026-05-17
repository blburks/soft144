class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return this;
      if (value < current.value) {
        if (!current.left) { current.left = node; return this; }
        current = current.left;
      } else {
        if (!current.right) { current.right = node; return this; }
        current = current.right;
      }
    }
  }

  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  remove(value) {
    this.root = this._removeNode(this.root, value);
    return this;
  }

  _removeNode(node, value) {
    if (!node) return null;
    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
    } else {
      // Node to remove found
      if (!node.left && !node.right) return null;       // leaf
      if (!node.left) return node.right;                // one child (right)
      if (!node.right) return node.left;                // one child (left)
      // Two children: replace with in-order successor (smallest in right subtree)
      let successor = node.right;
      while (successor.left) successor = successor.left;
      node.value = successor.value;
      node.right = this._removeNode(node.right, successor.value);
    }
    return node;
  }

  inOrderTraversal() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  preOrderTraversal() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      result.push(node.value);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  height() {
    const h = (node) => {
      if (!node) return -1;
      return 1 + Math.max(h(node.left), h(node.right));
    };
    return h(this.root);
  }

  postOrderTraversal() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.value);
    };
    traverse(this.root);
    return result;
  }
}

module.exports = { BinarySearchTree };

// --- Example usage ---
const bst = new BinarySearchTree();
bst.insert(10).insert(5).insert(15).insert(3).insert(7).insert(12).insert(20);

console.log("In-order:   ", bst.inOrderTraversal());   // [3, 5, 7, 10, 12, 15, 20]
console.log("Pre-order:  ", bst.preOrderTraversal());  // [10, 5, 3, 7, 15, 12, 20]
console.log("Post-order: ", bst.postOrderTraversal()); // [3, 7, 5, 12, 20, 15, 10]

console.log("Contains 7: ", bst.contains(7));   // true
console.log("Contains 9: ", bst.contains(9));   // false

bst.remove(5);
console.log("After remove(5):", bst.inOrderTraversal()); // [3, 7, 10, 12, 15, 20]
