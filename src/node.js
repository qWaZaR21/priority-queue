class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left || !this.right) {
			if (this.left) {
				this.right = node;
				this.right.parent = this;
			} else {
				this.left = node;
				this.left.parent = this;
			}
		}
	}

	removeChild(node) {
		if (this.left != node && this.right != node) {
			throw new Error("Error");
		}
		if (this.left === node) {
			this.left.parent = null;
			this.left = null;
			
		}
		if (this.right === node) {
			this.right.parent = null;
			this.right = null;
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
   
	}

	swapWithParent() {
		if (this.parent) {
			let temp;
			if (this.parent.left === this) {
				if (this.left) {
					this.left.parent = this.parent;
				}

				if (this.right) {
					this.right.parent = this.parent;
				}

				if (this.parent.right) {
					this.parent.right.parent = this;
				}

				temp = this.left;
				this.left = this.parent;
				this.parent.left = temp;

				temp = this.right;
				this.right = this.parent.right;
				this.parent.right = temp;					

				if (this.parent.parent) {
					if (this.parent.parent.left === this.parent) {
						this.parent.parent.left = this;
					}
					if (this.parent.parent.right === this.parent) {
						this.parent.parent.right = this;
					}	
				}

				temp = this.parent.parent;
				this.parent.parent = this;
				this.parent = temp;
				
			} else {
				if (this.left) {
					this.left.parent = this.parent;
				}

				if (this.right) {
					this.right.parent = this.parent;
				}

				if (this.parent.left) {
					this.parent.left.parent = this;
				}

				temp = this.left;
				this.left = this.parent.left;
				this.parent.left = temp;

				temp = this.right;
				this.right = this.parent;
				this.parent.right = temp;					

				if (this.parent.parent) {
					if (this.parent.parent.left === this.parent) {
						this.parent.parent.left = this;
					}
					if (this.parent.parent.right === this.parent) {
						this.parent.parent.right = this;
					}	
				}

				temp = this.parent.parent;
				this.parent.parent = this;
				this.parent = temp;
			}
		} 
	}
}

module.exports = Node;
