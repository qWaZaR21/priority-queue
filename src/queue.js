const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize) {
			this.maxSize = maxSize;
		} else {
			this.maxSize = 30;
		}
		this.heap = new MaxHeap();

	}

	push(data, priority) {
		if (this.heap.size() === this.maxSize) {
			throw new Error('Мы близко!');
		}
		this.heap.push(data, priority);
	}

	shift() {
		
		if (this.heap.size() === 0) {
			throw new Error('Мы близко!!!');
		} else {
			return this.heap.pop();
		}
	
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
