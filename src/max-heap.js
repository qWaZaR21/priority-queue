const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.currentSize++;
	}

	pop() {
		if (this.parentNodes.length) {
			this.currentSize--;
			const bombit = this.detachRoot();
			this.restoreRootFromLastInsertedNode(bombit);
			this.shiftNodeDown(this.root);
			return bombit.data;
		}
	}

	detachRoot() {
		let detachedRoot = this.root;
		if (this.parentNodes[0] === this.root){
			this.parentNodes.shift();
		}
		this.root = null;
		return detachedRoot;
	}
	
	restoreRootFromLastInsertedNode(detached) {
		

		if (this.parentNodes.length) {
			let newRoot = this.parentNodes.pop();
			if (detached.left === newRoot){
				this.root = newRoot;
				this.root.parent = this.root.left = this.root.right = null;
				this.parentNodes[0] = this.root;
			}

			if (detached.right === newRoot){
				this.root = newRoot;
				this.root.right = null;
				this.root.parent = null;
				this.root.left = detached.left;
				detached.left.parent = this.root;
				this.parentNodes.unshift(this.root);
			}

			if (detached.left !== newRoot && detached.right !== newRoot) {
				if (newRoot.parent) {
					if (newRoot.parent.left === newRoot){
						newRoot.parent.left = null;
					} else {
						this.parentNodes.unshift(newRoot.parent);
						newRoot.parent.right = null;
					}
				}
				this.root = newRoot;
				this.root.parent = null;
				this.root.left = detached.left;
				this.root.right = detached.right;
				if (this.root.left) {
					this.root.left.parent = this.root;
				}
				if (this.root.right) {
					this.root.right.parent = this.root;
				}
			}
		}
	}

	size() {
		return this.currentSize;
	}

	isEmpty() {
		if (!this.currentSize){
			return true;
		} else {
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right) {
				this.parentNodes.shift();
			}
		}	
	}

	shiftNodeUp(node) {
		if (node.parent) {
			let temp = null;
			if (node.priority > node.parent.priority) {

				if (this.parentNodes.indexOf(node) !== -1 &&
				this.parentNodes.indexOf(node.parent) == -1 ){
					this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
				}

				if (this.parentNodes.indexOf(node) !== -1 &&
				this.parentNodes.indexOf(node.parent) !== -1) {
					temp = this.parentNodes[0];
					this.parentNodes[0] = this.parentNodes.pop();
					this.parentNodes.push(temp);	
				}	
				
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		} else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
	
		if (node) {	
			let temp = null;
			let nodeIndex = this.parentNodes.indexOf(node);
			let nodeLeftIndex = this.parentNodes.indexOf(node.left);
			let nodeRightIndex = this.parentNodes.indexOf(node.right);
			
			if ((node.left && node.left.priority > node.priority) ||
				(node.right && node.right.priority > node.priority)) {	
				if (node.left && !node.right) {
					if (node.left.priority > node.priority){
						if (nodeIndex !== -1 && nodeLeftIndex !== -1) {
							temp = this.parentNodes[nodeIndex];
							this.parentNodes[nodeIndex] = this.parentNodes[nodeLeftIndex]
							this.parentNodes[nodeLeftIndex] = temp;
							node.left.swapWithParent();
							if (node.parent) {
								if (node.parent.parent === null){
									this.root = node.parent;
								}
							}
						}
					}
				}
				if (node.left && node.right) {
					if (node.left.priority > node.priority && node.left.priority > node.right.priority) {
						if (nodeLeftIndex !== -1){
							this.parentNodes[nodeLeftIndex] = node;
							node.left.swapWithParent();
							if (node.parent) {
								if (node.parent.parent === null){
									this.root = node.parent;
								}
							}
						}
						if (nodeLeftIndex === -1){
							node.left.swapWithParent();
							if (node.parent) {
								if (node.parent.parent === null){
									this.root = node.parent;
								}
							}
						}
					} else {
						if (node.right.priority > node.priority && node.left.priority < node.right.priority) {
							if (nodeRightIndex === -1) {
								node.right.swapWithParent();
								if (node.parent) {
									if (node.parent.parent === null){
										this.root = node.parent;
									}
								}
							}
							if (nodeRightIndex !== -1) {
								this.parentNodes[nodeRightIndex] = node;
								node.right.swapWithParent();
								if (node.parent) {
									if (node.parent.parent === null){
										this.root = node.parent;
									}
								}
							}
						}
					}
				}
				this.shiftNodeDown(node);
			}
		}
	
	}
}

module.exports = MaxHeap;
