define([ './Utils' ], function(Utils) {
	var Queue = function() {
		this.clear();
	};

	Queue.Node = function(data) {
		this.data = data;
		this.next = null;
	};

	Queue.prototype.add = function(element) {
		var node = new Queue.Node(element);
		if (this.isEmpty()) {
			this.head = this.tail = node;
		}else {
			this.tail.next = node;
			this.tail = node;
		}
		this.size++;
	};

	Queue.prototype.clear = function() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	};

	Queue.prototype.contains = function(element) {
		var current = this.head;
		while (current !== null) {
			if (Utils.compareElements(element, current.data)) {
				return true;
			}
			current = current.next;
		}
		return false;
	};

	Queue.prototype.isEmpty = function() {
		return this.head === null && this.tail === null;
	};

	Queue.prototype.peek = function() {
		if (this.isEmpty()) {
			return null;
		}
		return this.head.data;
	};

	Queue.prototype.poll = function() {
		if (this.isEmpty()) {
			return null;
		}
		var element = this.head.data;
		if (this.head === this.tail) {
			this.clear();
		}else {
			this.head = this.head.next;
		}
		this.size--;
		return element;
	};

	Queue.prototype.remove = function(element) {
		if (this.isEmpty()) {
			return false;
		}
		var last = null, current = this.head, next = current.next;
		while (current !== null) {
			if (Utils.compareElements(element, current.data)) {
				if (last === null && next === null) { //current is the only element in queue
					this.clear();
				}else if (last === null) { //current is the first element in queue
					this.head = next;
				}else if (next === null) { //current is the last element in queue
					this.tail = last;
					last.next = null;
				}else { // current is somewhere in middle of queue
					last.next = next;
				}
				this.size--;
				return true;
			}else {
				last = current;
				current = current.next;
				next = current ? current.next : null;
			}
		}
		return false;
	};

	Queue.prototype.size = function() {
		return this.size;
	};

	Queue.prototype.toArray = function() {
		var values = [], current = this.head;
		while (current !== null) {
			values.push(current.data);
			current = current.next;
		}
		return values;
	};
  return Queue;
});
