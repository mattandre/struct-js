define([ './ArrayList', './Utils' ], function(ArrayList, Utils) {
	var Map = function(map) {
		this.clear();
		if (map) {
			this.putAll(map);
		}
	};

	Map.prototype.clear = function() {
		this.data = {};
		this.length = 0;
	};

	Map.prototype.clone = function() {
		return new Map(this);
	};

	Map.prototype.containsKey = function(key) {
		return key in this.data;
	};

	Map.prototype.containsValue = function(value) {
		for (var key in this.data) {
			if (Utils.compareElements(value, this.data[key])) {
				return true;
			}
		}
		return false;
	};

	Map.prototype.each = function(action, context) {
		for (var key in this.data) {
			if (this.data.hasOwnProperty(key)) {
				action.call(context, this.data[key], key);
			}
		}
	};

	Map.prototype.entrySet = function() {
		return new Set(this.values());
	};

	Map.prototype.equals = function(other) {
		return this === other || (other instanceof Map &&
				this.entrySet().equals(other.entrySet()));
	};

	Map.prototype.get = function(key) {
		if (this.containsKey(key)) {
			return this.data[key];
		}
		return null;
	};

	Map.prototype.isEmpty = function() {
		return this.size() === 0;
	};

	Map.prototype.keySet = function() {
		var keySet = new Set(), key;
		for (key in this.data) {
			if (this.data.hasOwnProperty(key)) {
				keySet.add(key);
			}
		}
		return keySet;
	};

	Map.prototype.put = function(key, value) {
		var originalValue = null;
		if (this.containsKey(key)) {
			originalValue = this.get(key);
		}else {
			this.length++;
		}
		this.data[key] = value;
		return originalValue;
	};

	Map.prototype.putAll = function(data) {
		if (data instanceof Map) {
			data = data.data;
		}
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				this.put(key, data[key]);
			}
		}
	};

	Map.prototype.remove = function(key) {
		var originalValue = null;
		if (this.containsKey(key)) {
			originalValue = this.get(key);
			this.length--;
		}
		delete this.data[key];
		return originalValue;
	};

	Map.prototype.size = function() {
		return this.length;
	};

	Map.prototype.values = Map.prototype.toArray = function() {
		var list = new ArrayList(), key;
		for (key in this.data) {
			if (this.data.hasOwnProperty(key)) {
				list.add(this.data[key]);
			}
		}
		return list;
	};

  return Map;
});
