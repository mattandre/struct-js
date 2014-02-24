define([ './Utils' ], function(Utils) {
	var ArrayList = function(collection) {
		this.clear();
		if (collection) {
			this.addAll(collection);
		}
	};

	ArrayList.prototype.add = function(element, index) {
		if (index !== undefined && (index < 0 || index > this.length)) {
			return false;
		}
		if (index !== undefined) {
			for ( var i = this.length; i > index; i--) {
				this.data[i] = this.data[i - 1];
			}
			this.data[index] = element;
		}else {
			this.data.push(element);
		}
		this.length++;
		return true;
	};

	ArrayList.prototype.addAll = function(list, index) {
		if (index !== undefined && (index < 0 || index > this.length)) {
			return false;
		}
		var changed = false, i, length;
		if (index === undefined) {
			index = this.size();
		}
		list = Utils.getArray(list);
		for (i = 0, length = list.length; i < length; i++) {
			if (this.add(list[i], index + i)) {
				changed = true;
			}
		}
		return changed;
	};

	ArrayList.prototype.clear = function() {
		this.length = 0;
		this.data = [];
	};

	ArrayList.prototype.clone = function() {
		return new ArrayList(this);
	};

	ArrayList.prototype.contains = function(element) {
		return this.indexOf(element) >= 0;
	};

	ArrayList.prototype.each = function(action, context) {
		for (var i = 0, length = this.size(); i < length; i++) {
			action.call(context, this.get(i), i);
		}
	};

	ArrayList.prototype.get = function(index) {
		if (index >= this.length || index < 0) {
			return undefined;
		}
		return this.data[index];
	};

	ArrayList.prototype.indexOf = function(element) {
		for (var i = 0, length = this.size(); i < length; i++) {
			if (Utils.compareElements(element, this.get(i))) {
				return i;
			}
		}
		return -1;
	};

	ArrayList.prototype.isEmpty = function() {
		return this.size() === 0;
	};

	ArrayList.prototype.removeAt = function(index) {
		var element, i, length;
		if (index < this.length && index >= 0) {
			element = this.get(index);
			for (i = index, length = this.data.length - 1; i < length; i++) {
				this.data[i] = this.data[i+1];
			}
			this.length--;
		}
		return element;
	};

	ArrayList.prototype.remove = function(element) {
		var index = this.indexOf(element);
		this.removeAt(index);
		return index !== -1;
	};

	ArrayList.prototype.removeAll = function(list) {
		list = Utils.getArray(list);
		var changed = false, i, length;
		for (i = 0, length = list.length; i < length; i++) {
			if (this.remove(list[i])) {
				changed = true;
			}
		}
		return changed;
	};

	ArrayList.prototype.size = function() {
		return this.length;
	};

	ArrayList.prototype.set = function(index, element) {
		var originalElement;
		if (index < this.length && index >= 0) {
			originalElement = this.get(index);
			this.data[index] = element;
		}
		return originalElement;
	};

	ArrayList.prototype.sort = function(comparator) {
		return typeof comparator === 'function' ? this.data.sort(comparator) : this.data.sort();
	};

	ArrayList.prototype.subList = function(startIndex, endIndex) {
		var subList = new ArrayList(), i;
		if (startIndex > endIndex || startIndex < 0 || endIndex < 0 ||
				startIndex >= this.size() || endIndex > this.size()) {
			return subList;
		}
		for (i = startIndex; i < endIndex; i++) {
			subList.add(this.get(i));
		}
		return subList;
	};

	ArrayList.prototype.toArray = function() {
		return this.data;
	};
	return ArrayList;
});
