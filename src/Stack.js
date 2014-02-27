define([ './Utils' ], function(Utils) {
	var Stack = function() {
		this.clear();
	};

	Stack.prototype.push = function(element) {
		this.data.push(element);
	};

	Stack.prototype.clear = function() {
		this.data = [];
	};

	Stack.prototype.clone = function() {
		var i, length,
				stack = new Stack();
		for (i = 0, length = this.data.length; i < length; i++) {
			stack.push(this.data[i]);
		}
		return stack;
	};

	Stack.prototype.contains = function(element) {
		return this.indexOf(element) !== -1;
	};

	Stack.prototype.equals = function(other) {
		if (this === other){
			return true;
		}
		if (!(other instanceof Stack) || this.size() !== other.size()){
			return false;
		}
		for (var i = 0, length = this.size(); i < length; i++) {
			if (!Utils.compareElements(this.data[i], other.data[i])){
				return false;
			}
		}
		return true;
	};

	Stack.prototype.isEmpty = function() {
		return this.data.length === 0;
	};

	Stack.prototype.peek = function() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.data[this.data.length - 1];
	};

	Stack.prototype.pop = function() {
		return this.data.pop();
	};

	Stack.prototype.indexOf = function(element) {
		for (var i = this.size() - 1; i >= 0; i--) {
			if (Utils.compareElements(element, this.get(i))) {
				return i;
			}
		}
		return -1;
	};

	Stack.prototype.remove = function(element) {
		var length,
				index = this.indexOf(element);
		if (index !== -1){
			for (length = this.data.length - 1; index < length; index++) {
				this.data[index] = this.data[index + 1];
			}
			this.data.pop();
			return true;
		}
		return false;
	};

	Stack.prototype.size = function() {
		return this.data.length;
	};

	Stack.prototype.toArray = function() {
		return this.data;
	};

	Stack.prototype.toString = function() {
		return '[' + this.data + ']';
	};

  return Stack;
});
