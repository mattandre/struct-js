define([ './Utils' ], function(Utils) {
	var Queue = function() {
		this.clear();
	};

	Queue.prototype.add = function(element) {
		this.data[this.length++] = element;
	};

	Queue.prototype.clear = function() {
		this.data = [];
		this.length = 0;
	};

	Queue.prototype.contains = function(element) {
		for (var i = 0; i < this.length; i++) {
			if (Utils.compareElements(element, this.data[i])) {
				return true;
			}
		}
		return false;
	};

	Queue.prototype.isEmpty = function() {
		return this.length === 0;
	};

	Queue.prototype.peek = function() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.data[0];
	};

	Queue.prototype.poll = function() {
		if (this.isEmpty()) {
			return undefined;
		}
		var element = this.data[0];
		this.data.shift();
		this.length--;
		return element;
	};

	Queue.prototype.remove = function(element) {
		for (var i = 0; i < this.length; i++) {
			if (Utils.compareElements(element, this.data[i])) {
				this.length--;
				for (; i < this.length; i++) {
					this.data[i] = this.data[i + 1];
				}
				return true;
			}
		}
		return false;
	};

	Queue.prototype.size = function() {
		return this.length;
	};

	Queue.prototype.toArray = function() {
		return this.data;
	};

	Queue.prototype.toString = function() {
		return '[' + this.data + ']';
	};

  return Queue;
});
