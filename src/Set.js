define([ './Map', './Utils' ], function(Map, Utils) {
	var Set = function(collection) {
		this.map = new Map();
		if (collection) {
			this.addAll(collection);
		}
	};

	/**
	 * Obtains a unique key for an element of the set.  Primitives will yield the
	 * same key if they have the same type and convert to the same string.  Object
	 * references will yield the same key only if they refer to the same object.
	 * @param {*} val Object or primitive value to get a key for.
	 * @return {string} A unique key for this value/object.
	 * @private
	 */
	Set.getKey = function(value) {
		var type = typeof value;
		if (type === 'object' && value || type === 'function') {
			return 'o' + Utils.getUid(value);
		}else {
			return type.substr(0, 1) + value;
		}
	};

	Set.prototype.add = function(element) {
		var changed = !this.contains(element);
		this.map.put(Set.getKey(element), element);
		return changed;
	};

	Set.prototype.addAll = function(list) {
		var changed = false, i, length;
		list = Utils.getArray(list);
		for (i = 0, length = list.length; i < length; i++) {
			if (this.add(list[i])) {
				changed = true;
			}
		}
		return changed;
	};

	Set.prototype.clear = function() {
		this.map.clear();
	};

	Set.prototype.clone = function() {
		return new Set(this);
	};

	Set.prototype.contains = function(element) {
		return this.map.containsKey(Set.getKey(element));
	};

	Set.prototype.containsAll = function(list) {
		list = Utils.getArray(list);
		for (var i = 0, length = list.length; i < length; i++) {
			if (!this.contains(list[i])) {
				return false;
			}
		}
		return true;
	};

	Set.prototype.difference = function(collection) {
		var set = this.clone();
		set.removeAll(collection);
		return set;
	};

	Set.prototype.each = function(action, context) {
		this.map.each(action, context);
	};

	Set.prototype.equals = function(other) {
		return other instanceof Set && this.size() === other.size() && this.containsAll(other);
	};

	Set.prototype.intersection = function(collection) {
		var set = this.clone();
		set.retainAll(collection);
		return set;
	};

	Set.prototype.isEmpty = function() {
		return this.size() === 0;
	};

	Set.prototype.remove = function(element) {
		if (this.contains(element)) {
			this.map.remove(Set.getKey(element));
			return true;
		}
		return false;
	};

	Set.prototype.removeAll = function(list) {
		list = Utils.getArray(list);
		var changed = false, i, length;
		for (i = 0, length = list.length; i < length; i++) {
			if (this.remove(list[i])) {
				changed = true;
			}
		}
		return changed;
	};

	Set.prototype.retainAll = function(list) {
		if (!(list instanceof Set)) {
			list = new Set(Utils.getArray(list));
		}

		var changed = false;
		this.each(function(element) {
			if (!list.contains(element) && this.remove(element)) {
				changed = true;
			}
		},this);
		return changed;
	};

	Set.prototype.size = function() {
		return this.map.size();
	};

	Set.prototype.toArray = function() {
		return this.map.values().toArray();
	};

	Set.prototype.toString = function() {
		return '[' + this.map.values().toArray() + ']';
	};

	Set.prototype.union = function(collection) {
		var set = this.clone();
		set.addAll(collection);
		return set;
	};
  return Set;
});
