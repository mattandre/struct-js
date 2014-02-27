var PriorityQueue = function(comparator) {
	this.clear();
	if (comparator) {
		this.comparator = comparator;
	}
};

PriorityQueue.prototype.add = PriorityQueue.prototype.offer = function(element) {
	this.elements.push(element);
	this.siftUp(this.elements.length - 1);
};

PriorityQueue.prototype.clear = function() {
	this.elements = [];
};

PriorityQueue.prototype.isEmpty = function() {
	return this.size() === 0;
};

PriorityQueue.prototype.peek = function() {
	if (this.isEmpty()){
		return undefined;
	}
	return this.elements[0];
};

PriorityQueue.prototype.removeAt = function(index) {
	var size = this.size() - 1,
			elements = this.elements,
			movedElement = elements[size];
	if (index === size){
		return elements.pop();
	}else {
		elements[index] = movedElement;
		this.siftDown(index);
		if (elements[index] === movedElement) {
			this.siftUp(index);
			if (elements[index] !== movedElement) {
				return movedElement;
			}
		}
	}
	return undefined;
};

PriorityQueue.prototype.poll = function() {
	var size = this.size(),
			elements = this.elements,
			element = elements[0];
	if (size === 0) {
		return undefined;
	}else if (size === 1) {
		this.clear();
	}else {
		elements[0] = elements.pop();
		this.siftDown(0);
	}
	return element;
};

PriorityQueue.prototype.size = function() {
	return this.elements.length;
};

PriorityQueue.prototype.toArray = function() {
	return this.elements;
};

PriorityQueue.prototype.siftUp = function(index) {
	var parentIndex,
			elements = this.elements,
			element = elements[index];
	while (index > 0){
		parentIndex = (index - 1) >> 1;
		if (elements[parentIndex] <= element){
			break;
		}
		elements[index] = elements[parentIndex];
		index = parentIndex;
	}
	elements[index] = element;
};

PriorityQueue.prototype.siftDown = function(index) {
	var child, childIndex,
			size = this.size(),
			half = size >>> 1,
			elements = this.elements,
			element = elements[index];
	while (index < half){
		childIndex = 2 * index + 1;
		child = elements[childIndex];
		if (childIndex + 1 < size &&  child > elements[childIndex + 1]) {
			child = elements[++childIndex];
		}
    if (child >= element){
      break;
    }
    elements[index] = child;
    index = childIndex;
	}
	elements[index] = element;
};
